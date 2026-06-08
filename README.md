# EventHub – Premium Event Management & Booking Platform

EventHub is a high-fidelity, full-stack enterprise application designed for seamless event discovery, ticket allocation, and secure real-time booking. The system separates concerns completely across a responsive client web layer and a hardened, stateless RESTful backend framework.

---

## 💻 Frontend Architecture & UI Features

* **Immersive Visual Headers:** Event detail pages dynamically process media-loaded graphics to generate blur-filtered context canvases, maximizing focus on event layout data.
* **Dual-Column Transactional Grid:** Implements an asynchronous content distribution model on desktop viewports. Operational specifications are pinned on the left, while a sticky, transactional multi-state booking component handles conversions on the right.
* **Dynamic Parameterized Routing:** Utilizes query-string state persistence to allow instantaneous category filtering across conferences, festivals, and exhibitions without costly viewport updates.
* **Responsive Layout Design:** Built on a mobile-first fluid layout model utilizing modern structural CSS Grid and Flexbox mechanics to guarantee parity across standard smartphone, tablet, and desktop monitors.

---

## ⚙️ Backend Infrastructure & Security Architecture

* **Stateless Token-Based Security:** Powered by Spring Security and custom JWT filter middleware. All sensitive operations maintain a zero-session server footprint (`SessionCreationPolicy.STATELESS`), handling client identity validation exclusively via secure authorization headers.
* **Role-Based Access Control (RBAC):** Restricts data access strictly according to user privilege vectors (`ADMIN`, `ORGANIZER`, `USER`). Standard consumers can search resources natively, whereas administrative endpoints for creation, deletion, or modifications are isolated behind explicit authority checks.
* **Cross-Origin Resource Sharing (CORS):** Hardened origin configurations explicitly allow decoupled client operations on local domains while tightly sanitizing incoming HTTP method groups (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`).
* **Relational Persistence Layer:** Leverages a modern object-relational mapping repository structure with chronological filtering algorithms, ensuring high performance for data querying.

---

## 🛠️ Technical Stack Breakdown

### Frontend Environment
* **Core Framework:** React.js
* **Navigation Engine:** React Router DOM
* **Layout Utilities:** Bootstrap & Native CSS Stylesheets
* **Network Communication:** Axios HTTP Client

### Backend Environment
* **Core Framework:** Spring Boot
* **Security Module:** Spring Security (JSON Web Tokens)
* **Crypto Utilities:** BCrypt Password Encoder