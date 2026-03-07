import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Notification } from "./backend.d";
import {
  useAddNotification,
  useDeleteNotification,
  useEditNotification,
  useGetNotifications,
} from "./hooks/useQueries";

const ADMIN_PASSWORD = "design2026";

// ── Service Data ──────────────────────────────────────────────────────────────
const SERVICES = [
  { emoji: "🛂", name: "Passport (New/Renew)", grad: "service-gradient-1" },
  { emoji: "🪪", name: "Pan Card (New/Renew)", grad: "service-gradient-2" },
  {
    emoji: "🗳️",
    name: "Voter Card (New/Correction)",
    grad: "service-gradient-3",
  },
  { emoji: "📸", name: "Passport Size Photo", grad: "service-gradient-4" },
  { emoji: "📜", name: "Jeewan Parman", grad: "service-gradient-5" },
  {
    emoji: "🚗",
    name: "Scooter / Car / Commercial Vehicle Insurance",
    grad: "service-gradient-6",
  },
  { emoji: "🏠", name: "Tenant Verification", grad: "service-gradient-7" },
  { emoji: "💼", name: "Govt Job Form Fill", grad: "service-gradient-8" },
  {
    emoji: "🎓",
    name: "School / College Form Fill",
    grad: "service-gradient-9",
  },
  { emoji: "🏆", name: "Scholarship Form", grad: "service-gradient-10" },
  { emoji: "🍽️", name: "FSSAI License", grad: "service-gradient-11" },
  { emoji: "🏪", name: "Trade License", grad: "service-gradient-12" },
  { emoji: "🏦", name: "Property Tax", grad: "service-gradient-13" },
  { emoji: "🆔", name: "Aadhar Print", grad: "service-gradient-14" },
  { emoji: "📊", name: "CIBIL Score", grad: "service-gradient-15" },
  { emoji: "⚡", name: "E-Challan", grad: "service-gradient-16" },
  {
    emoji: "🚘",
    name: "RTO Office Work (RC Transfer / RC Renew / Duplicate RC etc.)",
    grad: "service-gradient-17",
  },
  { emoji: "📋", name: "FIR / PCC", grad: "service-gradient-18" },
  {
    emoji: "🌐",
    name: "Any Type of Online Form Fill Here",
    grad: "service-gradient-19",
  },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🙏</span>
            <span className="font-display font-bold text-lg sm:text-xl text-foreground">
              Balaji Online Services
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", id: "home" },
              { label: "Services", id: "services" },
              { label: "Notifications", id: "notifications" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <button
                type="button"
                key={id}
                data-ocid={`nav.${id}_link` as string}
                onClick={() => scrollTo(id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                {label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-full px-5 border-0"
              data-ocid="nav.contact_link"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <div className="flex flex-col gap-1 pt-2">
                {[
                  { label: "🏠 Home", id: "home" },
                  { label: "⚙️ Services", id: "services" },
                  { label: "🔔 Notifications", id: "notifications" },
                  { label: "📞 Contact", id: "contact" },
                ].map(({ label, id }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left px-4 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-balaji.dim_1600x600.jpg')",
        }}
      />
      <div className="absolute inset-0 hero-gradient opacity-90" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 bg-white" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10 bg-amber-300" />
      <div className="absolute top-40 left-1/4 w-24 h-24 rounded-full opacity-10 bg-white" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium mb-6"
        >
          <span className="text-yellow-300">⭐</span>
          Trusted Services Center
          <span className="text-yellow-300">⭐</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-4 text-shadow-glow"
        >
          🙏 Balaji
          <br />
          <span className="text-amber-300">Online Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-lg sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Your Trusted Partner for All Online Services
          <br />
          <span className="text-amber-200 font-semibold">
            Haibowal Kalan, Ludhiana
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="tel:9478200010"
            className="flex items-center gap-3 bg-white text-orange-600 font-bold text-lg rounded-full px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            9478200010
          </a>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-lg rounded-full px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            View All Services
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { num: "19+", label: "Services" },
            { num: "100%", label: "Online" },
            { num: "Fast", label: "Processing" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="font-display font-black text-2xl text-amber-300">
                {num}
              </div>
              <div className="text-white/80 text-sm">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-orange-100 text-orange-700 font-semibold text-sm px-4 py-2 rounded-full mb-4">
            🌟 Our Services
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-foreground mb-4">
            All Government & Online Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We handle all your document needs quickly and efficiently at a
            single location.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`${service.grad} rounded-2xl p-5 text-white shadow-md hover:shadow-xl transition-shadow cursor-default`}
            >
              <div className="text-4xl mb-3 drop-shadow">{service.emoji}</div>
              <h3 className="font-display font-bold text-base leading-snug text-white drop-shadow">
                {service.name}
              </h3>
              <div className="mt-3 flex items-center gap-1 text-white/70 text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Available
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────
function NotificationItem({
  notification,
  index,
  adminUnlocked,
  onEdit,
  onDelete,
  isDeleting,
}: {
  notification: Notification;
  index: number;
  adminUnlocked: boolean;
  onEdit: (n: Notification) => void;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      data-ocid={`notifications.item.${index + 1}` as string}
      className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium leading-relaxed break-words">
              {notification.message}
            </p>
            <span className="inline-block mt-2 text-xs bg-white/20 text-amber-200 rounded-full px-3 py-1 font-medium">
              📅 {notification.dateLabel}
            </span>
          </div>
        </div>

        {adminUnlocked && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              type="button"
              data-ocid={
                `admin.notification.edit_button.${index + 1}` as string
              }
              onClick={() => onEdit(notification)}
              className="w-8 h-8 rounded-lg bg-blue-400/30 hover:bg-blue-400/60 text-blue-200 hover:text-white flex items-center justify-center transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              data-ocid={
                `admin.notification.delete_button.${index + 1}` as string
              }
              onClick={() => onDelete(notification.id)}
              disabled={isDeleting}
              className="w-8 h-8 rounded-lg bg-red-400/30 hover:bg-red-400/60 text-red-200 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
              title="Delete"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function NotificationsSection() {
  const { data: notifications = [], isLoading } = useGetNotifications();
  const addMutation = useAddNotification();
  const editMutation = useEditNotification();
  const deleteMutation = useDeleteNotification();

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [newDateLabel, setNewDateLabel] = useState("");

  const [editingNotif, setEditingNotif] = useState<Notification | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [editDateLabel, setEditDateLabel] = useState("");
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAdminUnlocked(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleAddNotification = async () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (!newDateLabel.trim()) {
      toast.error("Please enter a date label");
      return;
    }
    try {
      await addMutation.mutateAsync({
        password: ADMIN_PASSWORD,
        message: newMessage.trim(),
        dateLabel: newDateLabel.trim(),
      });
      setNewMessage("");
      setNewDateLabel("");
      toast.success("Notification added successfully!");
    } catch {
      toast.error("Failed to add notification. Please try again.");
    }
  };

  const handleEditStart = (n: Notification) => {
    setEditingNotif(n);
    setEditMessage(n.message);
    setEditDateLabel(n.dateLabel);
  };

  const handleEditSave = async () => {
    if (!editingNotif) return;
    try {
      await editMutation.mutateAsync({
        password: ADMIN_PASSWORD,
        id: editingNotif.id,
        message: editMessage.trim(),
        dateLabel: editDateLabel.trim(),
      });
      setEditingNotif(null);
      toast.success("Notification updated!");
    } catch {
      toast.error("Failed to update notification.");
    }
  };

  const handleDelete = async (id: bigint) => {
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync({ password: ADMIN_PASSWORD, id });
      toast.success("Notification deleted.");
    } catch {
      toast.error("Failed to delete notification.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDialogClose = () => {
    setAdminOpen(false);
    setAdminUnlocked(false);
    setPasswordInput("");
    setPasswordError("");
    setEditingNotif(null);
  };

  return (
    <section
      id="notifications"
      data-ocid="notifications.section"
      className="py-20 px-4 sm:px-6 notif-gradient"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block bg-amber-400/20 text-amber-300 font-semibold text-sm px-4 py-2 rounded-full mb-3">
              🔔 Updates
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              Latest Notifications
            </h2>
            <p className="text-white/60 mt-1">
              Stay updated with the latest announcements
            </p>
          </div>

          <Button
            data-ocid="notifications.admin_button"
            onClick={() => setAdminOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-full px-5 py-2 border-0 flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Login
          </Button>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div
            data-ocid="notifications.loading_state"
            className="flex items-center justify-center gap-3 py-16 text-white/60"
          >
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span>Loading notifications...</span>
          </div>
        )}

        {/* Empty */}
        {!isLoading && notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="notifications.empty_state"
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔔</div>
            <p className="text-white/60 text-lg">No notifications yet.</p>
            <p className="text-white/40 text-sm mt-1">
              Check back later for updates.
            </p>
          </motion.div>
        )}

        {/* List */}
        {!isLoading && notifications.length > 0 && (
          <div data-ocid="notifications.list" className="flex flex-col gap-3">
            {notifications.map((n, i) => (
              <NotificationItem
                key={n.id.toString()}
                notification={n}
                index={i}
                adminUnlocked={adminUnlocked}
                onEdit={handleEditStart}
                onDelete={handleDelete}
                isDeleting={deletingId === n.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Admin Dialog */}
      <Dialog open={adminOpen} onOpenChange={handleDialogClose}>
        <DialogContent
          data-ocid="admin.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              {adminUnlocked ? "Admin Panel" : "Admin Login"}
            </DialogTitle>
          </DialogHeader>

          <button
            type="button"
            data-ocid="admin.close_button"
            onClick={handleDialogClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Password form */}
          {!adminUnlocked && (
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-white/80 mb-2 block">
                  Enter Admin Password
                </Label>
                <Input
                  data-ocid="admin.password_input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  placeholder="Enter password..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-amber-400"
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                )}
              </div>
              <Button
                data-ocid="admin.submit_button"
                onClick={handlePasswordSubmit}
                className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold border-0"
              >
                Login
              </Button>
            </div>
          )}

          {/* Admin panel */}
          {adminUnlocked && (
            <div className="space-y-6 pt-2">
              {/* Add notification */}
              <div className="bg-white/5 rounded-xl p-4 space-y-3">
                <h3 className="font-display font-bold text-amber-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Notification
                </h3>
                <div>
                  <Label className="text-white/80 mb-1 block text-sm">
                    Date Label
                  </Label>
                  <Input
                    data-ocid="admin.add_notification.input"
                    value={newDateLabel}
                    onChange={(e) => setNewDateLabel(e.target.value)}
                    placeholder="e.g. March 7, 2026"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-amber-400 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-white/80 mb-1 block text-sm">
                    Message
                  </Label>
                  <Textarea
                    data-ocid="admin.add_notification.textarea"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter notification message..."
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-amber-400 text-sm resize-none"
                  />
                </div>
                <Button
                  data-ocid="admin.add_notification.submit_button"
                  onClick={handleAddNotification}
                  disabled={addMutation.isPending}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-bold border-0"
                >
                  {addMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Notification
                    </>
                  )}
                </Button>
              </div>

              {/* Existing notifications */}
              {notifications.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-amber-400 mb-3">
                    Manage Notifications
                  </h3>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n, i) => (
                      <div
                        key={n.id.toString()}
                        className="bg-white/5 rounded-xl p-3 border border-white/10"
                      >
                        {editingNotif?.id === n.id ? (
                          <div className="space-y-2">
                            <Input
                              value={editDateLabel}
                              onChange={(e) => setEditDateLabel(e.target.value)}
                              placeholder="Date label"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-amber-400 text-sm"
                            />
                            <Textarea
                              value={editMessage}
                              onChange={(e) => setEditMessage(e.target.value)}
                              placeholder="Message"
                              rows={2}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-amber-400 text-sm resize-none"
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={handleEditSave}
                                disabled={editMutation.isPending}
                                size="sm"
                                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-bold border-0"
                              >
                                {editMutation.isPending ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  "Save"
                                )}
                              </Button>
                              <Button
                                onClick={() => setEditingNotif(null)}
                                size="sm"
                                variant="outline"
                                className="flex-1 border-white/20 text-white/70 hover:bg-white/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                                {n.message}
                              </p>
                              <span className="text-amber-300/70 text-xs mt-1 block">
                                {n.dateLabel}
                              </span>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                data-ocid={
                                  `admin.notification.edit_button.${i + 1}` as string
                                }
                                onClick={() => handleEditStart(n)}
                                className="w-7 h-7 rounded-lg bg-blue-500/30 hover:bg-blue-500/60 text-blue-300 hover:text-white flex items-center justify-center transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                data-ocid={
                                  `admin.notification.delete_button.${i + 1}` as string
                                }
                                onClick={() => handleDelete(n.id)}
                                disabled={deletingId === n.id}
                                className="w-7 h-7 rounded-lg bg-red-500/30 hover:bg-red-500/60 text-red-300 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
                              >
                                {deletingId === n.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 px-4 sm:px-6 bg-gradient-to-br from-orange-50 to-amber-50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-orange-100 text-orange-700 font-semibold text-sm px-4 py-2 rounded-full mb-4">
            📞 Get In Touch
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg">
            Visit us or reach out — we are here to help!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Phone className="w-7 h-7 text-white" />,
              title: "Phone",
              value: "9478200010",
              href: "tel:9478200010",
              bg: "service-gradient-1",
              desc: "Call us anytime",
            },
            {
              icon: <Mail className="w-7 h-7 text-white" />,
              title: "Email",
              value: "balajifeb2020@gmail.com",
              href: "mailto:balajifeb2020@gmail.com",
              bg: "service-gradient-2",
              desc: "Send us an email",
            },
            {
              icon: <MapPin className="w-7 h-7 text-white" />,
              title: "Address",
              value: "4022 St. No. 3, Durga Puri, Haibowal Kalan, Ludhiana",
              href: "https://maps.google.com/?q=Haibowal+Kalan+Ludhiana",
              bg: "service-gradient-13",
              desc: "Visit our shop",
            },
          ].map(({ icon, title, value, href, bg, desc }) => (
            <motion.a
              key={title}
              href={href}
              target={title === "Address" ? "_blank" : undefined}
              rel={title === "Address" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div
                className={`${bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md`}
              >
                {icon}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs mb-2">{desc}</p>
              <p className="text-foreground font-medium text-sm leading-snug break-all">
                {value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Map embed placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl overflow-hidden shadow-md border border-border/50 h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
        >
          <div className="text-center">
            <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <p className="font-display font-bold text-foreground">
              Balaji Online Services
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              4022 St. No. 3, Durga Puri, Haibowal Kalan, Ludhiana
            </p>
            <a
              href="https://maps.google.com/?q=Haibowal+Kalan+Ludhiana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-orange-600 font-semibold text-sm hover:underline"
            >
              Open in Google Maps <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🙏</span>
            <span className="font-display font-black text-xl text-amber-400">
              Balaji Online Services
            </span>
          </div>
          <p className="text-white/60 text-sm text-center max-w-md">
            Your one-stop destination for all government and online services in
            Ludhiana.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
            <a
              href="tel:9478200010"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> 9478200010
            </a>
            <a
              href="mailto:balajifeb2020@gmail.com"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" /> balajifeb2020@gmail.com
            </a>
          </div>
          <div className="border-t border-white/10 pt-6 w-full text-center space-y-1">
            <p className="text-white/50 text-xs">
              © {year} Balaji Online Services. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Button ───────────────────────────────────────────────────────────
function WhatsAppButton() {
  const phone = "919478200010";
  const message = encodeURIComponent(
    "Hello! I need help with a service at Balaji Online Services.",
  );
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-white flex-shrink-0"
        role="img"
        aria-label="WhatsApp"
      >
        <title>WhatsApp</title>
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.827.737 5.476 2.027 7.782L0 32l8.418-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Zm0 29.333a13.28 13.28 0 0 1-6.77-1.852l-.485-.289-5.003 1.194 1.215-4.862-.317-.499A13.3 13.3 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.293-9.98c-.4-.2-2.363-1.166-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.566c-.233.267-.466.3-.866.1-.4-.2-1.688-.622-3.215-1.984-1.188-1.059-1.99-2.368-2.223-2.768-.233-.4-.025-.616.175-.815.18-.179.4-.466.6-.7.2-.233.267-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.766-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.83.262 2.519.159.768-.115 2.363-.966 2.696-1.9.333-.933.333-1.733.233-1.9-.1-.167-.366-.267-.766-.467Z" />
      </svg>
      <span className="font-semibold text-sm whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <NotificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
