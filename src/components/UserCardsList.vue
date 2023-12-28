<template>
  <div class="scrollable-wrapper" ref="scrollableWrapper">
    <div class="list">
      <UserCard v-for="user in users" :user="user" :key="user.id" />
    </div>
    <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { getRandomUsers } from "@/services/api";
  import UserCard from "@/components/UserCard.vue";

  /**
   * Offset used to determine if the user has reached the bottom of the scrollable area.
   * @type {number}
   */
  const KINETIC_SCROLL_OFFSET = 10;

  /**
   * Reference to the scrollable wrapper element.
   * @type {Ref<HTMLElement | null>}
   */
  const scrollableWrapper = ref(null);

  /**
   * Array of user objects representing the displayed users.
   * @type {Ref<Array<Object>>}
   */
  const users = ref([]);

  /**
   * Boolean indicating whether data is currently being loaded.
   * @type {Ref<boolean>}
   */
  const isLoading = ref(false);

  /**
   * Loads additional random users when the user scrolls to the bottom of the list.
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves once new users are loaded.
   */
  const loadRandomUsers = async () => {
    isLoading.value = true;
    const newRandomUsers = await getRandomUsers(15);
    users.value.push(...newRandomUsers);
    isLoading.value = false;
  };

  /**
   * Handles the scroll event and triggers loading of additional users when at the bottom.
   * @function
   * @returns {void}
   */
  const handleScroll = () => {
    if (isLoading.value) {
      return;
    }

    /**
     * Indicates whether the user has scrolled to the bottom of the scrollable area.
     * @type {boolean}
     */
    const isAtBottom =
      scrollableWrapper.value.scrollTop + scrollableWrapper.value.clientHeight >=
      scrollableWrapper.value.scrollHeight - KINETIC_SCROLL_OFFSET;

    if (isAtBottom) {
      loadRandomUsers();
    }
  };

  onMounted(() => {
    scrollableWrapper.value.addEventListener("scroll", handleScroll);
    loadRandomUsers();
  });

  onUnmounted(() => {
    scrollableWrapper.value.removeEventListener("scroll", handleScroll);
  });
</script>

<style scoped>
  .scrollable-wrapper {
    height: 100vh;
    overflow-y: auto;
  }

  .list {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1em;
    max-width: 800px;
    margin: 0 auto;
  }

  .loader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-align: center;
    padding: 20px;
  }

  .spinner {
    border: 8px solid white;
    border-top: 8px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
