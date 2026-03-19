#!/bin/bash
fuser -k 5173/tcp 2>/dev/null
npm run dev -- --port 5173
