<script lang="ts">
  export let content: string;
  export let align: "left" | "right";
</script>

<div class="{align}">
  <p>{content}</p>
</div>

<style>
  div {
    width: 66%;
    background-color: #6272A4;
    color: #F8F8F2;
    font-size: 1.25rem;
    padding: .5rem;
    border-radius: .5rem;
  }

  .left {
    align-self: flex-start;
  }

  .right {
    align-self: flex-end;
  }
</style>