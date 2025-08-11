FROM node:18-alpine

WORKDIR /usr/src/app

# Install Python dependencies for backend
RUN apk add --no-cache python3 py3-pip gcc musl-dev python3-dev g++ make cmake
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --upgrade pip setuptools wheel
RUN pip install numpy scipy
RUN pip install scikit-learn ortools

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --no-cache && npm cache clean --force

# Build frontend
COPY frontend/package*.json ./frontend/
WORKDIR /usr/src/app/frontend
RUN npm install --legacy-peer-deps && npm cache clean --force

COPY frontend/src ./src/
COPY frontend/pages ./pages/
COPY frontend/public ./public/
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.cjs ./
COPY frontend/eslint.config.js ./
RUN npm run build

# Move build to backend dist folder
WORKDIR /usr/src/app
RUN cp -r frontend/dist ./dist

# Copy backend source (excluding package.json since it's already copied)
COPY backend/server.js ./
COPY backend/routes ./routes/
COPY backend/models ./models/
COPY backend/services ./services/
COPY backend/__tests__ ./__tests__/

# Create user and set permissions
RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001
RUN chown -R nodeuser:nodejs /usr/src/app
USER nodeuser

EXPOSE 5000

CMD ["npm", "start"]
