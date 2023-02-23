FROM node
WORKDIR /server
RUN apt update  && apt install -y sudo
ARG USERNAME=user
ARG GROUPNAME=user
ARG UID=1050
ARG GID=1050
ARG PASSWORD=user
RUN groupadd -g ${GID} ${GROUPNAME} && \
		useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USERNAME} && \
		echo ${USERNAME}:$PASSWORD | chpasswd && \
    echo "$USERNAME   ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER $USERNAME
ENTRYPOINT [ "npm", "start" ]