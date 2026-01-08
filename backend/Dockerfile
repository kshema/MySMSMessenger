FROM ruby:3.3.5

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  nodejs \
  git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN gem install bundler -v ">= 4"

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3000
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0", "-p", "3000"]
