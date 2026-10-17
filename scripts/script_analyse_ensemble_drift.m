%%D = csvread('~/Downloads/arcade_tja_frame_notes.csv', 1, 0, "emptyvalue", NaN);
D = csvread('~/Downloads/arcade_tja_model3_exp3multif0.csv', 1, 0, "emptyvalue", NaN);
t = D(:,1);
C = D(:, 4:3:end);                      % the eight cents columns
M = ~isnan(C);               % occupied slots (check how empties land)
C(~M)=0;
X = sum(cos(2*pi*C/100) .* M, 2);
Y = sum(sin(2*pi*C/100) .* M, 2);
n = sum(M, 2);
drift = -mod(-atan2(Y, X) * 100/(2*pi), 100);   % wrap into (-100, 0]
R     = hypot(X, Y) ./ max(n, eps);

% Smooth over a window in seconds, not in rows: silent frames are missing from the csv, so a
% fixed number of rows spans a varying amount of time.
% Two time scales: the long window gives a trend that can be unwrapped safely, the short window
% gives the detail, added as its deviation from that trend so it is never accumulated.
% Estimates are made at the recorded frame times t (256 samples at 22050 Hz, ~11.6 ms hop), with
% trailing windows: each estimate only uses the current frame and the past, so it is causal.
% The cost is a delay of about half the window (W/2 and WL/2 s) relative to a centred window.
W    = 1;                    % s short window: detail, sigma and voice count
WL   = 8;                    % s long window: trend; the 20-cent bins need seconds of averaging
Rmin = 0.0; %0.1;                  % below this long-window concentration the trend is held
RminS = 0.0; %0.3;                 % below this short-window concentration the detail is noise
tg = t;
N  = numel(t);
cX = [0; cumsum(X)]; cY = [0; cumsum(Y)]; cn = [0; cumsum(n)];
Xg = zeros(N, 1); Yg = Xg; ng = Xg; ns = Xg;
XL = Xg; YL = Xg; nL = Xg;
lo = 1; loL = 1;   % first row of each window; t is sorted, so they only move forward
for i = 1:N
  % Causal: each window ends at the current row and only looks back.
  while t(lo) <= t(i) - W, lo = lo + 1; end
  while t(loL) <= t(i) - WL, loL = loL + 1; end
  Xg(i) = cX(i+1) - cX(lo);
  Yg(i) = cY(i+1) - cY(lo);
  ng(i) = cn(i+1) - cn(lo);
  ns(i) = ng(i) / (i - lo + 1);     % mean number of detected voices per frame
  XL(i) = cX(i+1) - cX(loL);
  YL(i) = cY(i+1) - cY(loL);
  nL(i) = cn(i+1) - cn(loL);
end
drift_s = atan2(Yg, Xg) * 100/(2*pi);
Rg      = hypot(Xg, Yg) ./ max(ng, eps);
sigma_g = sqrt(-2*log(max(Rg, eps))) * 100/(2*pi);
RL      = hypot(XL, YL) ./ max(nL, eps);

% Chance-corrected concentration. N random angles already give R0(N) ~ 1/sqrt(N), so low-count
% windows look concentrated by luck. Rc = 0 is chance level, 1 is perfect agreement, and it can go
% negative (angles spread more evenly than chance). R0 is exact for N = 1, 2 (1 and 2/pi) and
% sqrt(pi/(4N)) * (1 + 1/(16N)) for N >= 3, accurate to 0.5% at N = 3 and better beyond.
R0f = @(N) (N == 1) + (N == 2) * (2/pi) ...
         + (N >= 3) .* sqrt(pi ./ (4*max(N, 1))) .* (1 + 1 ./ (16*max(N, 1)));
Rcg = (Rg - R0f(ng)) ./ (1 - R0f(ng));
RcL = (RL - R0f(nL)) ./ (1 - R0f(nL));
Rcg(ng == 0) = NaN;                 % no detections: undefined
RcL(nL == 0) = NaN;

% Trend: unwrap the long window by summing the angle between consecutive vectors rather than with
% unwrap(): each step is then the shortest one, and steps from unreliable windows are dropped
% instead of being counted as a +/-100 cent wrap that stays in the curve for the rest of the song.
ZL    = complex(XL, YL);
step  = angle(ZL(2:end) .* conj(ZL(1:end-1))) * 100/(2*pi);
step(RL(2:end) < Rmin | RL(1:end-1) < Rmin) = 0;
trend = angle(ZL(1)) * 100/(2*pi) + [0; cumsum(step)];

% Detail: the short window's angle relative to the trend, in (-50, 50]. Rotating by the conjugate
% instead of subtracting cents keeps it wrap-safe; a bad short window only spoils its own point.
Zg     = complex(Xg, Yg);
detail = angle(Zg .* conj(ZL)) * 100/(2*pi);

drift_u = trend + detail;
offset  = 100*ceil(drift_u(1)/100);             % start in (-100, 0]
drift_u = drift_u - offset;
trend   = trend - offset;                       % same shift, so it stays on top of drift_u

% Leave gaps where either window is unreliable: the trend is held there, or the short window's
% vectors nearly cancel (or it has no detections), so its angle is undefined.
unreliable = RL < Rmin | Rg < RminS | ng == 0;
drift_u(unreliable) = NaN;

% Key fit: absolute drift including whole semitones, from the known key. The song has no flats or
% sharps, so it is C major or A minor; both use the white keys, so one template serves. Every
% window's notes are folded onto one octave (1200 cents above C) and the template is slid over
% them; the best shift is the drift. Nothing is accumulated, so a bad window only spoils itself.
% A semitone shift is easy to reject (only 2 of 7 notes shared), but a whole-tone shift shares 5
% of 7 and can score almost as well, so the search is kept close to the previous estimate. That
% keeps it causal: each estimate uses only the past window and the previous estimate.
hopK     = 0.5;                  % s between key fits
WK       = 2;                    % s causal window; needs several chords to pin down the key
sigK     = 20;                   % cents width of each template note
startK   = 100;                  % cents; the choir is assumed to start within this of pitch
jumpK    = 50;                   % cents; largest change allowed between consecutive fits
minDetK  = 20;                   % fewer detections in the window: no fit, previous one is kept
scaleK   = [0 200 400 500 700 900 1100];   % C D E F G A B, in cents above C
%scaleK   = [0 100 200 300 400 500 600 700 800 900 1000 1100];   % semitone scale

F = D(:, 2:3:end);                       % the eight f0 columns
[slot, rowK] = find(M.');                % row-major, so detections come out in time order
fK    = F(sub2ind(size(F), rowK, slot));
centK = mod(round(1200*log2(fK/440) + 900), 1200);   % cents above C, folded to one octave
tK    = t(rowK);

x = (0:1199)';
dK = abs(mod(x - scaleK + 600, 1200) - 600);         % distance to each scale note
TK = sum(exp(-dK.^2 / (2*sigK^2)), 2);
TK = TK - mean(TK);                      % zero mean: a flat histogram scores 0 for every shift
FTK = conj(fft(TK));
shiftK = [0:599, -600:-1]';              % shift belonging to each correlation lag

tk = (t(1) + WK : hopK : t(end))';
key_drift = NaN(size(tk));
prev = NaN;
lo = 1; hi = 0;
for i = 1:numel(tk)
  while lo <= numel(tK) && tK(lo) <= tk(i) - WK, lo = lo + 1; end
  while hi < numel(tK) && tK(hi+1) <= tk(i), hi = hi + 1; end
  if hi - lo + 1 < minDetK, continue; end
  h = accumarray(centK(lo:hi) + 1, 1, [1200, 1]);
  score = real(ifft(fft(h) .* FTK));    % score(k+1): histogram shifted by shiftK(k+1) cents
  if isnan(prev)
    ok = abs(shiftK) <= startK;
  else
    ok = abs(mod(shiftK - prev + 600, 1200) - 600) <= jumpK;
  end
  score(~ok) = -Inf;
  [~, best] = max(score);
  s = shiftK(best);
  if ~isnan(prev)
    s = prev + mod(s - prev + 600, 1200) - 600;   % continue past +/-600 instead of wrapping
  end
  key_drift(i) = s;
  prev = s;
end

% Spread within the choir, measured against the key fit. Each detection is shifted by the key
% drift and compared with the nearest scale note. The scale notes are 100 or 200 cents apart, so a
% singer 60 cents flat on D still counts as D, where the 100-cent circle would wrap them round to
% the other side. Causal: each detection uses the latest key fit made at or before its time.
WS = WK;                                  % s causal window for the spread measures
keyHeld = key_drift;                      % fill gaps with the previous fit, as the tracking does
for i = 2:numel(keyHeld)
  if isnan(keyHeld(i)), keyHeld(i) = keyHeld(i-1); end
end
iK = floor((tK - tk(1)) / hopK) + 1;      % latest fit at or before each detection
sK = NaN(size(tK));
sK(iK >= 1) = keyHeld(min(iK(iK >= 1), numel(tk)));

centE = mod(1200*log2(fK/440) + 900, 1200);          % unrounded cents above C
dS = mod(centE - sK - scaleK + 600, 1200) - 600;     % signed distance to each scale note
[~, noteS] = min(abs(dS), [], 2);
res = dS(sub2ind(size(dS), (1:numel(tK))', noteS)); % deviation from the nearest scale note
valid = ~isnan(res);

% Within-frame spread: deviations from the frame's own mean, so drift over time cannot enter.
% Pooling the squared deviations and dividing by sum(n - 1) keeps frames with few voices from
% looking more in tune than they are.
fcnt  = accumarray(rowK(valid), 1, [N, 1]);
fmean = accumarray(rowK(valid), res(valid), [N, 1]) ./ max(fcnt, 1);
fss   = accumarray(rowK(valid), (res(valid) - fmean(rowK(valid))).^2, [N, 1]);
cSS = [0; cumsum(fss)];
cDF = [0; cumsum(max(fcnt - 1, 0))];

[std_k, mad_k, within_k] = deal(NaN(size(tk)));
lo = 1; hi = 0; loR = 1; hiR = 0;
for i = 1:numel(tk)
  while lo <= numel(tK) && tK(lo) <= tk(i) - WS, lo = lo + 1; end
  while hi < numel(tK) && tK(hi+1) <= tk(i), hi = hi + 1; end
  while loR <= N && t(loR) <= tk(i) - WS, loR = loR + 1; end
  while hiR < N && t(hiR+1) <= tk(i), hiR = hiR + 1; end
  r = res(lo:hi);
  r = r(~isnan(r));
  if numel(r) < minDetK, continue; end
  std_k(i) = std(r);
  mad_k(i) = median(abs(r - median(r)));   % robust: not pulled up by stray detections
  dfw = cDF(hiR+1) - cDF(loR);
  if dfw > 0, within_k(i) = sqrt((cSS(hiR+1) - cSS(loR)) / dfw); end
end

figure(1);
clf;
subplot(5,1,1);
plot(tg, trend, 'k', 'LineWidth', 2);
hold on;
%plot(tg, [drift_u, drift_u-sigma_g, drift_u+sigma_g]);
plot(tg, [drift_u]);
plot(tk, key_drift, 'r', 'LineWidth', 2);
hold off;
legend('trend', 'drift', 'key fit');
grid on;
subplot(5,1,2);
plot(tg, detail)
grid on;
subplot(5,1,3);
plot(tg, [nL,ng]);
subplot(5,1,4);
plot(tg, [RL, Rg]);
legend('trend', 'detail');
ylabel('R (uncorrected)');
ylim([-1.2,1]);
grid on;
subplot(5,1,5);
plot(tk, [mad_k, std_k, within_k]);
legend('MAD', 'std', 'within-frame std');
ylabel('spread around key fit (cents)');
xlabel('time (s)');
grid on;
