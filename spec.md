# Balaji Online Services

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Public-facing shop website for "Balaji Online Services" in Ludhiana
- Hero section with shop name, tagline, and contact info
- Services grid displaying all 18+ services offered (Passport, Pan Card, Voter Card, Passport Size Photo, Jeewan Parman, Insurance, Tenant Verification, Govt Job Form, School/College Form, Scholarship Form, FSSAI License, Trade License, Property Tax, Aadhar Print, CIBIL Score, E-Challan, RTO Office Work, FIR/PCC, Any Online Form)
- Notifications section visible to all visitors showing daily updates
- Admin panel (password-protected, password: design2026) to add, edit, and delete notifications
- Contact section with mobile (9478200010), email (balajifeb2020@gmail.com), and address (4022 St. No. 3, Durga Puri, Haibowal Kalan, Ludhiana)
- Colorful, professional, visually appealing design

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan

**Backend:**
- Notification data model: id, message, date, createdAt
- Public query: getNotifications() -> returns all notifications sorted by date desc
- Admin mutations (password-protected): addNotification(msg, date), editNotification(id, msg, date), deleteNotification(id) -- password verified on backend
- Store admin password hash or compare directly in canister

**Frontend:**
- Navigation bar with shop name and nav links (Home, Services, Notifications, Contact)
- Hero section: shop name, tagline, phone number, prominent CTA
- Services section: colorful card grid for each service with an icon
- Notifications section: list of current notifications visible to all; "Admin" button to open login modal
- Admin modal: password input; on success show add/edit/delete notification UI
- Contact section: address, phone, email with icons
- Footer with copyright
- Colorful design with vibrant gradients, icons for each service
