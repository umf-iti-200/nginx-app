upstream my_http_servers {
    server 192.168.64.3:3000;      # server1 listens to port 3000
    server 192.168.64.3:3001;      # server2 listens to port 3001
    server 192.168.64.3:3002;      # server3 listens to port 3002
}

server {
    listen 80;
    server_name mysite.com www.mysite.com;

    location / {
        proxy_pass http://my_http_servers;
    }
}
