<template>
  <b-container class="h-100">
    <b-navbar variant="light" type="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand tag="h1" class="mb-0">Integration Test</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="https://github.com/GoryMoon/TwitchIntegrationTest">Source</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
      <b-col>
        <h1>Setup</h1>
        <ol>
          <li>
            Enter mod token from the extension config page
          </li>
          <li>
            Press connect
          </li>
          <li>
            Enter game and set it
          </li>
          <li>
            Test sending actions to
          </li>
        </ol>
        <b-input-group class="mt-3">
          <b-form-input
            :type="tokenType"
            v-model="token"
            @input="updateToken"
            placeholder="Enter the mod token"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="toggleToken">Toggle Visibility</b-button>
          </b-input-group-append>
        </b-input-group>
        
        <b-input-group class="mt-3 mb-3">
          <b-form-input
            v-model="game"
            placeholder="Enter the game to connect with"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="changeGame">Set Game</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-button class="mr-1" variant="success" @click="connect">Connect</b-button>
        <b-button variant="danger" @click="disconnect">Disconnect</b-button>
      </b-col>
      <b-col>
        <h1>Log</h1>
        <b-list-group class="log">
          <b-list-group-item v-for="(log, i) in logs" :key="i">
            {{ log }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'test',
  data() {
    return {
      logs: [],
      token: '',
      tokenType: 'password',
      game: ''
    }
  },
  sockets: {
    connect() {
      this.logs.unshift('Socket connected')
    },
    disconnect() {
      this.logs.unshift('Socket disconnected')
    },
    error(error) {
      this.logs.unshift(`Socket error: ${error}`)
    },
    action(data) {
      this.logs.unshift(`Action data: ${JSON.stringify(data)}`)
    },
    cp_action(data) {
      this.logs.unshift(`CP action data: ${JSON.stringify(data)}`)
    },
  },
  methods: {
    toggleToken() {
      if (this.tokenType === 'text') {
        this.tokenType = 'password';
      } else {
        this.tokenType = 'text';
      }
    },
    updateToken() {
      this.$socket.client.io.opts.query = {
        token: this.token,
      }
    },
    changeGame() {
      this.$socket.client.emit('game', this.game)
      this.logs.unshift(`Set game to ${this.game}`)
    },
    connect() {
      this.$socket.client.connect()
    },
    disconnect() {
      this.$socket.client.disconnect()
    }
  },
}
</script>

<style scoped>
.log {
  border: 1px solid rgba(0, 0, 0, 0.125);
  max-height: 500px;
  overflow: scroll;
  border-radius: 0.25rem;
  border-radius: 0.25rem;
}
</style>
