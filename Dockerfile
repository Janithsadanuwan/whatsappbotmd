FROM Janithsadanuwan/core:v0.0.13

RUN git clone https://github.com/Janithsadanuwan/dragonx-md  /root/dragonx-md/
WORKDIR /root/dragonx-md /

ENTRYPOINT ["janith-multi-device-whatsapp-start.sh"]