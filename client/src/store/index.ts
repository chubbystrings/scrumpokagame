// stores/counter.js
import { defineStore } from "pinia";
import { USER, POINT, REVEAL, TICKET, NOTIFICATION, FIBONACCI } from "../types/types";

export const useStore = defineStore("user", {
  state: () => {
    return {
      currentUser: {} as USER,
      users: [] as USER[],
      points: [] as POINT[],
      teamName: "",
      reveal: {} as REVEAL,
      isModalOpen: {
        component: "",
        open: false,
      },
      currentTicket: "",
      notification: {} as NOTIFICATION,
      fibonacci: [] as FIBONACCI[],
      sideBarOpen: false,
      hangingPointsIsOpen: true
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setCurrentUser(user: USER) {
      this.currentUser = user;
    },

    setUsers(users: USER[]) {
      this.users = users;
    },

    setFibonacci(data: FIBONACCI[]) {
      this.fibonacci = data
    },

    setPoints(points: POINT[]) {
      this.points = points;
    },

    setTeamName(name: string) {
      this.teamName = name;
    },

    setReveal(reveal: REVEAL) {
      this.reveal = {
        ...reveal,
      };
    },

    setCurrentTicket(ticket: TICKET) {
      this.currentTicket = ticket ? ticket.name : '';
    },

    openModal(name: string) {
      this.isModalOpen = {
        component: name,
        open: true,
      };
    },

    closeModal() {
      this.isModalOpen = {
        component: "",
        open: false,
      };
    },

    setNotification(message: string) {
      this.notification = {
        message,
        show: true
      }
      setTimeout(() => {
        this.notification = {
          message: '',
          show: false
        }
      }, 2000);
    },

    toggleSideBar() {
      this.sideBarOpen = !this.sideBarOpen
    },

    toggleHangingPoints () {
      this.hangingPointsIsOpen = !this.hangingPointsIsOpen
    }
  },

  getters: {
    getAllUsers(state) {
      return state.users;
    },

   getAuthor(state) {
     return state.users.find((user) => user.type === 'author')
   },

    getCurrentUser(state) {
      return state.currentUser
    },

    getFibonacci(state) {
      return state.fibonacci
    },

    getAllPoints(state) {
      return state.points;
    },

    getTeamName(state) {
      return state.teamName;
    },

    getReveal(state) {
      return state.reveal;
    },
    getModalStatus(state) {
      return state.isModalOpen.open;
    },
    getCurrentTicketName(state) {
      return state.currentTicket;
    },
    getCurrentModalComponent(state) {
      return state.isModalOpen.component;
    },

    getNotificationStatus (state) {
      return state.notification
    },
    getSideBarStatus (state) {
      return state.sideBarOpen
    },
    getHangingPointsStatus(state) {
      return state.hangingPointsIsOpen
    }
  },
});
