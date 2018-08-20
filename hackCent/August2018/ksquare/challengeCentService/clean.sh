cd /var/www/html/ && ./stop-server.sh && ./stop-mongod.sh && cd ~/git/app
echo "finished stopping services"
rm -r /var/www/html/*
echo "cleaned HTTP Root Directory"
