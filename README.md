# Lead Capture AI Agent

## Introduction

The project is developed as part of the Engineering Assignment provided by the **OPLIFY SOLUTIONS PVT. LTD.**

The project provide real world solution for the lead generation and track it till its fullfilment to provide end customer a smooth onboarding. This is a inital generic draft of the web application project which can can be enhanced in future based on the business domain specification and requirements.

## Key Features

- Lead Capture Form
- Admin Panel
- AI agent
- Advance Dashboard

## Tech stack

- Frontend : React.js
- Backend : Node.js, express.js
- Database : PostgreSQL 13
- AI Agent : OpenRouter
- CSS : Talwind CSS
- Repository : GitHub

## Environment variables

Database connection config to be stored in .env file
PORT=5000
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PWD>
DB_HOST=localhost
DB_NAME=lead_capture
DB_PORT=5432

## Steps

1. Click or paste the [URL](http://localhost:5173/) in browser to open the application.
   ![Landing page](image.png)
2. You will be navigated to the landing page with two options

   ### 2.1. Submit a Lead:

   (a) Click on the "Go to Lead Form" button to navigate to the Lead Capture Form.
   ![Lead Capture Form](image-1.png)

   (b) The form have the fileds like Full Name, Email, Business Name and Message.

   (c) Validation are applied to each filed to capture the all required data.
   ![Form Validation](image-2.png)

   (d) Once you click the Submit Lead button the data will be submitted to the backend system.

   ### 2.2. Admin Panel:

   (a) On clicking to the "Admin Panel" button will navigate to the "Admin Panel – Leads" dashboard.
   ![Admin Panel Dashboard](image-3.png)

   (b) The dashboard has the table with all the leads data with an AI agent score and message that helps the admin to pick the leads for further action.

   ### 2.3. Advance Admin Panel:

   (a) On the top left of the "Admin Panel – Leads" dashboard, user will find the "GO TO Dashboard" button.

   (b) On clicking this button user will get navigated to the Advance dashboard.

   (c) This dasboard contains the Pie Chart, Bar Chart with the Leads table.
   ![Advance Admin Dashboard](image-4.png)

   (d) Advance dashbaord helpn the admin user to track the each day leads with the hot, cold and ward score.

   (e) On the top rigt user can find "Download Report" button that can help user to download the leads_report.csv file in local machine.

## AI tools I used and how

## My AI orchestration decisions
