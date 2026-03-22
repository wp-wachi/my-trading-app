# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
# ก๊อปปี้เฉพาะไฟล์ที่จำเป็นจากการ build มา (ช่วยให้ Image เล็กลงมาก)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]