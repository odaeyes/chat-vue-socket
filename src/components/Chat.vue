<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>room {{room}}</h3>
              <hr>
          </div>
          <div class="card-body">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="registerUser">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
          </form>
          <form @submit.prevent="sendMessage">
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io('localhost:3000'),
            room: 'xee',
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }

    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
        this.socket.on('ROOM', function(data){
          this.room = data;
          console.log("23",data)
        });
    }
}
</script>

<style>

</style>