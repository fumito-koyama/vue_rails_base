FROM ruby:2.7.1

ENV RAILS_PORT 3000
ENV RAILS_IP 0.0.0.0
ENV NODE_MAJOR_VERSION 12

RUN mkdir /opt/app
ENV WORK_DIR /opt/app
WORKDIR $WORK_DIR
VOLUME $WORK_DIR

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash - \
      && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
      && echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list \
      && apt-get -qq update \
      && apt-get install -y nodejs yarn \
      && apt-get install -y gcc g++ make # development tools to build native addons

EXPOSE 4567 8080 ${RAILS_PORT} 3035

COPY setup.sh /root/setup.sh

RUN chmod +x /root/setup.sh \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/*

CMD /root/setup.sh