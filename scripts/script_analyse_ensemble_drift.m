D = csvread('~/Downloads/parijs_frame_notes.csv', 1, 0, "emptyvalue", NaN);
t = D(:,1);
C = D(:, 4:3:end);                      % the eight cents columns
M = ~isnan(C);                 % occupied slots (check how empties land)
C(~M)=0;
X = sum(cos(2*pi*C/100) .* M, 2);
Y = sum(sin(2*pi*C/100) .* M, 2);
n = sum(M, 2);
drift = atan2(Y, X) * 100/(2*pi);
R     = hypot(X, Y) ./ max(n, eps);
k = 10;
Xs = filter(ones(k,1)/k, 1, X, X(1)*(k-1:-1:1)'/k);         % smooth the vectors,
Ys = filter(ones(k,1)/k, 1, Y, Y(1)*(k-1:-1:1)'/k);         % not the angles
ns = filter(ones(k,1)/k, 1, n, n(1)*(k-1:-1:1)'/k);
drift_s = atan2(Ys, Xs) * 100/(2*pi);
Rs     = hypot(Xs, Ys) ./ max(ns, eps);
sigma_s= sqrt ( -2*log(Rs) ) * 100/(2*pi);

figure(1);
clf;
subplot(3,1,1);
plot(t, [unwrap(drift_s/100*2*pi)*100/(2*pi), unwrap(drift_s/100*2*pi)*100/(2*pi)-sigma_s, unwrap(drift_s/100*2*pi)*100/(2*pi)+sigma_s]);   % then unwrap in time
grid on;
subplot(3,1,2);
plot(t, drift_s)
grid on;
subplot(3,1,3);
plot(t,ns);


