# Hacksgon_2026_Finals_CodingDuo

## HOW TO RUN
Set up backend :

install ngrok
set up ngrok
run command ngrok http 8080

1) make a folder src/main/resources
2) make a application.properties
3) Paste the below and fill the un-filled depecdencies
   spring.application.name=api
------------------------------------------------------------------------------------------------------------------------------
#Database config
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
#JWT Config
accesstoken.key=
refreshtoken.key=
accesstoken.life=
refreshtoken.life=
#Mail
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=
spring.mail.password=
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
groq.api.key=
groq.api.url=https://api.groq.com/openai/v1/chat/completions
college.email.domain=@nitdgp.ac.in
--------------------------------------------------------------------------------------------------
4)Open UserController and delete the 'if admin' part from registration.
5)Send an register 2 endpoint request in it and obtain a entry.
6)Go to database and set role of that entity to ADMIN to one.
7) ensure spring boot is set up and jar package in target is up-to-date
8) run command mvn springboot:run
9) backend good to go.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
FRONTEND : 
💻 Frontend Setup (React + Vite)

The frontend is a high-performance SPA built with Vite, utilizing Tailwind CSS for styling and Framer Motion for fluid UI animations.

Navigate to the frontend directory:

Bash
cd client
Install dependencies:
This will install React, Vite, Framer Motion, React Router Dom, and the Tailwind CSS suite.

Bash
npm install
Configure Environment Variables:
Create a .env file in the root of the /client directory. This is crucial for connecting to the backend via your Ngrok tunnel or local server.

Code snippet
# Replace with your actual Ngrok or Backend URL
VITE_API_BASE_URL=https://your-ngrok-url-here.ngrok-free.dev
Launch the Development Server:

Bash
npm run dev
The app will be accessible at http://localhost:5173 (unless configured otherwise).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## 🎓 Unified Student Support Platform

**One Platform. Total Campus Control.**

A full-stack, AI-powered campus management system that unifies academic resources, grievance handling, and student wellbeing into a single seamless experience.

Built for **Hacksagon Hackathon 2026**.

---

## 🚀 Vision

Campus systems today are fragmented, slow, and frustrating. Students juggle multiple portals for notices, academics, complaints, and support—while administrators struggle with inefficient workflows.

The **Unified Student Support Platform** eliminates this chaos by delivering:

* 🧭 A single source of truth for students
* ⚡ Real-time issue resolution workflows
* 🤖 AI-assisted administration

---

## 🧩 Problem Statement

* ❌ Disconnected academic & admin systems
* ❌ Inefficient grievance handling
* ❌ Lack of transparency in issue resolution
* ❌ No centralized wellbeing support

---

## 💡 Solution

A centralized, role-based platform that provides:

* 🎯 A unified student dashboard
* 🛠️ Structured grievance lifecycle tracking
* 📢 Smart notice & resource distribution
* 🧠 AI-powered administrative assistance

---

## 🛠️ Tech Stack

| Layer         | Technology                                 |
| ------------- | ------------------------------------------ |
| **Frontend**  | React.js, Vite, Tailwind CSS, React Router |
| **Backend**   | Java, Spring Boot, Spring Security         |
| **Database**  | PostgreSQL / MySQL (Spring Data JPA)       |
| **AI Engine** | Groq API (`llama-3.1-8b-instant`)          |

---

## ✨ Key Features

### 👨‍🎓 Student Experience

* 🔐 **Domain-Restricted Authentication**
  Access limited strictly to verified institutional emails

* 📚 **Smart Academic Hub**
  A dynamic feed that intelligently separates:

  * Notices
  * Academic resources (notes, PDFs, past papers)

* 📊 **Performance Analytics**

  * Attendance tracking
  * CGPA monitoring with visual indicators

* 🛠️ **Grievance System**

  * Submit issues
  * Track status in real-time
  * Transparent resolution flow

* 🚨 **SOS Emergency Support**
  Instant alert system for urgent assistance

* 🧠 **Context-Aware Ticket Suggestions** *(subtle enhancement)*
  While submitting a grievance, the system quietly analyzes the input and suggests:

  * Relevant existing tickets
  * Likely issue categories
  * Possible quick resolutions
    reducing duplicate reports and speeding up fixes

---

### 🛡️ Administrator Control Panel

* 🔑 **Secure Role-Based Access** (`/admin`)

* 📥 **Grievance Management System**
  Ticket lifecycle:

  ```
  New → Under Review → Resolved
  ```

* 🤖 **AI-Powered Notice Generator**
  Converts raw notes into:

  * Clean
  * Professional
  * Markdown-formatted announcements

* 🔄 **Dual Publishing Engine**

  * Notices → Database
  * Resources → Validated external links

* 📊 **Lightweight Operational Insights** 
  Admins get subtle analytics like:

  * Most frequent complaint categories
  * Average resolution time
  * Peak issue hours
    helping improve campus operations over time

---

## 🧠 AI Integration

Powered by **Groq + LLaMA 3**, enabling:

* ✍️ Automatic formatting of admin notices
* 📄 Clean, structured communication output
* ⚡ Instant response generation
* 🧩 Intelligent ticket understanding (classification + suggestions)

**Endpoint:**

```
POST /api/notice/enhance
```

---

## 🔌 API Architecture

All end points are not given use
To get all endpoints use http://localhost:8080/swagger-ui.html


### 🔐 Authentication

```
POST /user/login  
POST /user/register  
POST /user/refresh
POST /user/logout
```

### 📢 Broadcast System

```
POST /api/notice/new  
POST /api/resource/new  
GET  /api/notice/all  
```

### 🛠️ Grievance System

```
POST  /api/ticket/new  
PATCH /api/ticket/seen/{id}  
PATCH /api/ticket/solved/{id}  
```

### 🚨 Emergency Support

```
POST /api/sos  
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SOUVIK-D10/Hacksgon_2026_Finals_CodingDuo.git
cd unified-student-support
```

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd server
```

**Requirements:**

* Java 21+
* Maven

**Configure:**

```
src/main/resources/application.properties
```

**Run:**

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd client
npm install
```

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080
```

*(Optional: use Ngrok for remote testing)*

**Run:**

```bash
npm run dev
```

---

## 🏗️ Architecture Highlights

* 🔄 RESTful API design
* 🔐 Secure authentication & authorization
* 🧩 Modular frontend architecture
* ⚡ Real-time UI updates
* 🤖 AI-enhanced workflows

---

## 🚧 Future Scope

* 📱 Mobile app (Flutter / React Native)
* 🔔 Push notifications
* 📊 Advanced analytics dashboard
* 🧑‍⚕️ Integrated counseling system
* 🏫 Multi-campus scalability

---

## 👥 Team

* **Frontend & UI/UX:** Srijan Gupta
* **Backend & API:** Souvik Chatterjee

---

## 🏁 Final Note

This isn’t just a project—it’s a **scalable blueprint for modern campuses**.

Built with speed ⚡, precision 🎯, and real-world impact 🌍 for Hacksagon 2026.

---
