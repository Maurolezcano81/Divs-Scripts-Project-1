# Proyecto de Asistente de Bienestar Mental

## Descripción General

Este proyecto es una plataforma integral para el bienestar mental, diseñada para ayudar a los usuarios a comprender y gestionar mejor sus emociones, pensamientos y comportamientos. La plataforma combina evaluación de personalidad, seguimiento emocional, gestión de actividades y un asistente de IA personalizado para ofrecer apoyo adaptado a las características psicológicas únicas de cada usuario.

## Características Principales

- **Evaluación de Personalidad**: Análisis de arquetipos y temperamentos para ofrecer una experiencia personalizada.
- **Seguimiento Emocional**: Registro y análisis de estados de ánimo y emociones con visualización de tendencias.
- **Gestor de Actividades**: Organización de tareas de autocuidado y crecimiento personal.
- **Notas Reflexivas**: Espacio para documentar pensamientos, sentimientos y reflexiones.
- **Asistente de IA Personalizado**: Conversaciones con un asistente de IA adaptado al perfil psicológico del usuario.
- **Dashboard Analítico**: Visualización de patrones y tendencias de bienestar.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Frontend**: Interfaz de usuario desarrollada con React
- **Backend**: API REST desarrollada con Node.js, Express y MongoDB

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- Cuenta de OpenAI con acceso a la API
- Variables de entorno configuradas

## Instalación

### Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `server` con las siguientes variables:

```
# Servidor
NODE_ENV=development
PORT=3000
HOST=localhost

# Base de Datos
DB_USERNAME=tu_usuario_mongodb
DB_PASSWORD=tu_contraseña_mongodb
DB_CONNECTION_STRING=tu_cadena_de_conexion

# OpenAI
OPENAI_API_KEY=tu_api_key_de_openai
OPENAI_API_URL=https://models.inference.ai.azure.com
OPENAI_MODEL=gpt-4o

# JWT
JWT_SECRET=tu_clave_secreta_para_jwt
JWT_EXPIRES_IN=1d

# CORS
CORS_ORIGIN=*
CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
```

### Instalar Dependencias y Ejecutar

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

## Uso de la Plataforma

### 1. Registro y Evaluación Inicial

Al registrarte, completarás un cuestionario para determinar tu perfil de arquetipos y temperamentos. Este perfil es fundamental para personalizar tu experiencia en la plataforma.

#### Arquetipos Evaluados:

- Cuidador
- Explorador
- Forajido
- Héroe
- Mago
- Sabio

#### Temperamentos Evaluados:

- Colérico
- Flemático
- Melancólico
- Sanguíneo
- Supino

### 2. Dashboard Personal

Tras completar la evaluación, accederás a tu dashboard personal que muestra:

- Resumen de tu perfil psicológico
- Tendencias emocionales de los últimos 7 días
- Actividades recientes y pendientes
- Acceso rápido a notas y conversaciones con tu asistente

### 3. Registro de Emociones

Utiliza la función "Registro de Emociones" para:

- Documentar cómo te sientes en momentos específicos
- Calificar la intensidad de tus emociones (1-10)
- Añadir contexto o notas a cada registro
- Visualizar patrones y tendencias con el tiempo

### 4. Gestión de Actividades

Organiza actividades para tu bienestar:

- Crea tareas con título, descripción y estado
- Actualiza el progreso (pendiente, en-progreso, completado, cancelado)
- Recibe recomendaciones personalizadas basadas en tu perfil

### 5. Notas Reflexivas

Mantén un diario de reflexiones:

- Crea notas con título, contenido y etiquetas
- Organiza tus pensamientos con un sistema de etiquetas
- Busca y filtra notas anteriores

### 6. Asistente de IA Personalizado

Conversa con un asistente de IA adaptado a tu perfil psicológico:

- El asistente adapta su tono, estilo y recomendaciones a tu perfil de arquetipos y temperamentos
- Obtén apoyo emocional, estrategias y orientación personalizada
- Todas las conversaciones se guardan para referencia futura

## Consideraciones Importantes

1. **No es un Sustituto de Terapia Profesional**: Esta plataforma es una herramienta complementaria y no reemplaza la atención de profesionales de salud mental.

2. **Privacidad y Seguridad**: Todos los datos son confidenciales y almacenados de forma segura. Revisa nuestra política de privacidad para más detalles.

3. **Personalización Adaptativa**: El sistema se vuelve más preciso y útil cuanto más lo uses, adaptándose a tus necesidades específicas.

## API y Endpoints

La API del servidor incluye los siguientes grupos de endpoints:

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/verify` - Verificación de token

### Usuario

- `GET /api/users/:id` - Obtener información de usuario
- `PUT /api/users/:id` - Actualizar información de usuario

### Emociones

- `GET /api/emotions` - Listar registros de emociones
- `GET /api/emotions/last7days` - Obtener emociones de la última semana
- `POST /api/emotions` - Crear nuevo registro de emoción
- `PUT /api/emotions/:id` - Actualizar registro de emoción
- `DELETE /api/emotions/:id` - Eliminar registro de emoción

### Actividades

- `GET /api/activities` - Listar actividades
- `GET /api/activities/:id` - Obtener detalles de actividad
- `POST /api/activities` - Crear nueva actividad
- `PUT /api/activities/:id` - Actualizar actividad
- `DELETE /api/activities/:id` - Eliminar actividad

### Notas

- `GET /api/notes` - Listar notas
- `GET /api/notes/:id` - Obtener detalle de nota
- `POST /api/notes` - Crear nueva nota
- `PUT /api/notes/:id` - Actualizar nota
- `DELETE /api/notes/:id` - Eliminar nota

### Chat con IA

- `GET /api/chats` - Listar conversaciones
- `GET /api/chats/:id` - Obtener conversación completa
- `POST /api/chats/create` - Iniciar nueva conversación
- `POST /api/chats/:id/messages` - Enviar mensaje en conversación existente
- `PATCH /api/chats/:id/title` - Actualizar título de conversación
- `DELETE /api/chats/:id` - Eliminar conversación

### Clasificación y Evaluación

- `POST /api/classification/classify` - Procesar y clasificar perfil de personalidad

## Modelos de Datos

### Usuario

```javascript
{
  name: String,
  email: String,
  password: String,
  active: Boolean,
  birthDate: Date,
  gender: String,
  nationality: String,
  emotions: [ObjectId],
  chats: [ObjectId],
  notes: [ObjectId],
  activities: [ObjectId],
  archetype: [ObjectId],
  temperament: [ObjectId],
  classifications: [ObjectId]
}
```

### Emoción

```javascript
{
  user: ObjectId,
  mood: String,
  intensity: Number,
  createdAt: Date
}
```

### Actividad

```javascript
{
  title: String,
  description: String,
  status: String,
  user: ObjectId,
  createdAt: Date
}
```

### Nota

```javascript
{
  title: String,
  content: String,
  user: ObjectId,
  tags: [String],
  createdAt: Date
}
```

### Chat

```javascript
{
  title: String,
  user: ObjectId,
  messages: [{
    role: String,
    content: String,
    createdAt: Date
  }],
  createdAt: Date
}
```
