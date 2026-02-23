/**
 * install k6 for windows/linus/mac
 * run-command: "k6 run script.js"
 */

import http from "k6/http";

export default function () {
  http.get("http://localhost:3000");
}
