# Quick Reference: Super Admin vs Ward Admin

## Login Credentials

### Super Admin (City-Level)
```
Email: superadmin@delhi.gov.in
Password: superadmin123
Ward: Delhi (All Wards)
```

### Ward Admin (Rohini Ward)
```
Email: wardadmin@rohini.gov.in
Password: wardadmin123
Ward: Rohini (Ward No. 8)
```

---

## Data Scope

| Feature | Ward Admin | Super Admin |
|---------|------------|-------------|
| **Ward Access** | Rohini only | All 8 wards |
| **Alerts** | Rohini ward (5 alerts) | City-wide (12 alerts) |
| **Hotspots** | Rohini ward (8 hotspots) | All wards (72 hotspots) |
| **Reports** | Rohini residents only | All wards (view only) |
| **Map View** | Rohini boundary | All 8 ward boundaries |
| **Map Zoom** | Min 12 (ward level) | Min 10 (city level) |
| **Map Center** | Rohini (28.7250, 77.1000) | Delhi (28.6139, 77.2090) |

---

## Permissions

### Ward Admin CAN:
✅ Verify citizen reports (Rohini only)  
✅ Reject reports with reasons  
✅ Mark hotspots on map  
✅ Update report status (Pending → In Progress → Resolved)  
✅ Upload resolution proof  
✅ Manage ward resources  
✅ View ward-specific analytics  

### Ward Admin CANNOT:
❌ See other wards' data  
❌ Access city-wide statistics  
❌ View other wards on map  
❌ Modify system settings  

---

### Super Admin CAN:
✅ View all 8 wards  
✅ Monitor city-wide statistics  
✅ Track ward performance  
✅ View critical alerts from all wards  
✅ Filter alerts by ward  
✅ See city-level map with all boundaries  
✅ Identify underperforming wards  
✅ View aggregate reports data  

### Super Admin CANNOT:
❌ Verify individual citizen reports  
❌ Mark new hotspots  
❌ Upload resolution proof  
❌ Change report status  
❌ Execute ward-level actions  

---

## Dashboard Comparison

### Ward Admin Dashboard
```
👨‍💼 Ward Admin Dashboard
Your Ward: Rohini | Ward No. 8

[Ward-Specific Stats]
• Total Reports: [Rohini only]
• Pending Reports: [Rohini only]
• Hotspots: 8 (Rohini)
• Ward Readiness: 65%

[Sections]
• Recent Reports (Rohini)
• Ward Resources
• Verify/Reject Reports
• Upload Resolution Proof
```

### Super Admin Dashboard
```
🛡️ Super Admin Dashboard
Delhi City Administrator
City-Level Oversight & Monitoring

[City-Wide Stats]
• Total Wards: 8
• High-Risk Wards: 3
• Active Alerts: 12 (city-wide)
• Total Hotspots: 72 (all wards)
• Average Readiness: 63%

[Sections]
• Ward Performance Overview (all 8 wards)
• City-Wide Reports Summary
• Critical Alerts (all wards)
• Strategic Actions
```

---

## Map Behavior

### Ward Admin Map
- **Initial View**: Rohini ward center
- **Zoom**: 12 (ward-focused)
- **Boundaries**: 1 (Rohini - purple)
- **Interaction**: 
  - Click map to mark hotspot ✅
  - Click ward boundary to zoom in
  - View reports and hotspots
- **Restriction**: Cannot zoom out below 12

### Super Admin Map
- **Initial View**: Delhi city center
- **Zoom**: 11 (city-wide)
- **Boundaries**: 8 (all wards - color-coded)
  - 🟢 Green: 70%+ readiness (Excellent)
  - 🟣 Purple: 60-69% readiness (Good)
  - 🟠 Orange: 50-59% readiness (Moderate)
  - 🔴 Red: <50% readiness (Low)
- **Interaction**:
  - View all ward boundaries
  - Click ward to fly to it
  - Read-only (cannot mark hotspots) ❌
  - View existing reports and hotspots
- **Restriction**: Cannot mark new hotspots

---

## Alerts View

### Ward Admin
```
🔔 Alerts Center - Rohini Ward
Real-time notifications for your ward's incidents

[Filters]
• All | Critical | High | Medium | Low

[Alerts]
• Only Rohini ward alerts (5 total)
• No ward badges needed
```

### Super Admin
```
🔔 City-Wide Alerts Center
Monitor real-time notifications across all wards

[Filters]
• All | Critical | High | Medium | Low

[Ward Filter] ⭐ NEW
• All Wards | Rohini | Dwarka | Karol Bagh | Shahdara | ...

[Alerts]
• All ward alerts (12 total)
• Each alert shows ward badge
• Can filter by specific ward
```

---

## Wards Page

### Ward Admin
```
🏢 Rohini Ward Monsoon Preparedness
Monitor flood response readiness for your ward

[Sections]
• Rohini Ward Card (readiness, resources, hotspots)
• Ward Resources Details
• Marked Hotspots List ✅
```

### Super Admin
```
🏢 City-Wide Ward Management
Monitor all wards across Delhi

[Sections]
• All 8 Ward Cards (grid view)
• Ward Performance Comparison
• No Hotspots List ❌ (strategic oversight only)
```

---

## All 8 Wards (Super Admin View)

| Ward | Ward No. | Readiness | Hotspots | Risk Level |
|------|----------|-----------|----------|------------|
| Rohini | 8 | 65% | 8 | Good 🟣 |
| Dwarka | 12 | 72% | 6 | Excellent 🟢 |
| Karol Bagh | 45 | 55% | 12 | Moderate 🟠 |
| Shahdara | 78 | 48% | 15 | Low 🔴 |
| Najafgarh | 23 | 68% | 9 | Good 🟣 |
| Janakpuri | 56 | 70% | 7 | Excellent 🟢 |
| Vasant Vihar | 34 | 78% | 4 | Excellent 🟢 |
| Mayur Vihar | 89 | 52% | 11 | Moderate 🟠 |

**City Average Readiness**: 63%  
**High-Risk Wards** (< 60%): 3 (Karol Bagh, Shahdara, Mayur Vihar)  
**Total Hotspots**: 72

---

## Navigation Routes

### Ward Admin
- `/ward-admin-dashboard` - Main dashboard
- `/alerts` - Rohini ward alerts
- `/wards` - Rohini ward details + hotspots
- `/map` - Rohini ward map
- `/analytics` - Ward analytics

### Super Admin
- `/super-admin-dashboard` - Main city dashboard
- `/alerts` - City-wide alerts with ward filter
- `/wards` - All 8 wards overview
- `/map` - City-wide map with all boundaries
- `/analytics` - City-level analytics

---

## Key Differences Summary

### Scope
- **Ward Admin**: Single ward (Rohini) - Execution focus
- **Super Admin**: All wards (Delhi) - Supervision focus

### Actions
- **Ward Admin**: Verify reports, mark hotspots, resolve issues
- **Super Admin**: Monitor, identify trends, NO execution

### Map
- **Ward Admin**: Ward-level, can interact, mark hotspots
- **Super Admin**: City-level, read-only, view all wards

### Alerts
- **Ward Admin**: Ward-specific (5 alerts)
- **Super Admin**: City-wide with ward filter (12 alerts)

### Reports
- **Ward Admin**: Manage Rohini reports (verify, reject, resolve)
- **Super Admin**: View city reports (read-only, statistics only)

---

## Role Philosophy

### Ward Admin
**"Local Execution"**
- Handles day-to-day operations
- Verifies and resolves citizen reports
- Manages ward resources
- Marks flood-prone areas
- Uploads proof of resolution

### Super Admin
**"Central Supervision"**
- Strategic oversight across city
- Monitors ward performance
- Identifies underperforming wards
- Tracks city-wide trends
- Does NOT interfere with ward operations
- Focuses on big-picture planning

---

## Testing Checklist

### Ward Admin Test
- [ ] Login with wardadmin@rohini.gov.in
- [ ] See "Your Ward: Rohini" banner
- [ ] Dashboard shows Rohini stats only
- [ ] Alerts page shows 5 Rohini alerts
- [ ] Map centered on Rohini
- [ ] Can click map to mark hotspot
- [ ] Can verify reports
- [ ] Wards page shows hotspots list

### Super Admin Test
- [ ] Login with superadmin@delhi.gov.in
- [ ] See "City-Level Oversight" banner
- [ ] Dashboard shows 8 wards
- [ ] Total hotspots shows 72
- [ ] Active alerts shows 12
- [ ] Alerts page has ward filter
- [ ] Map shows all 8 colored boundaries
- [ ] Cannot mark new hotspots
- [ ] Wards page shows all 8 cards
- [ ] No hotspots list visible
