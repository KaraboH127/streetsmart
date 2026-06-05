import handler from "../src/server";

export default {
  async fetch(request, env, ctx) {
    return handler.fetch(request, env, ctx);
  },
};