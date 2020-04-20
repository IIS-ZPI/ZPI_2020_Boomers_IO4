class AppController < ApplicationController
    def index
        render component: 'App'
    end
end
