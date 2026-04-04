# Hacksgon_2026_Finals_CodingDuo

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
