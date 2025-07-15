FROM quay.io/qasimtech/global-botz:latest

RUN git clone https://github.com/GlobalTechInfo/GLOBAL-XMD /root/mega && \
    rm -rf /root/mega/.git

WORKDIR /root/mega
RUN npm install || yarn install

EXPOSE 5000
CMD ["npm", "start"]
