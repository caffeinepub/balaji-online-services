import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  module Notification {
    public func compareByNewestFirst(a : Notification, b : Notification) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  type Notification = {
    id : Nat;
    message : Text;
    dateLabel : Text;
    createdAt : Int;
  };

  let notifications = Map.empty<Nat, Notification>();
  var nextId = 1;
  let adminPassword = "design2026";

  public query ({ caller }) func getNotifications() : async [Notification] {
    notifications.values().toArray().sort(Notification.compareByNewestFirst);
  };

  public shared ({ caller }) func addNotification(password : Text, message : Text, dateLabel : Text) : async () {
    if (not Text.equal(password, adminPassword)) {
      Runtime.trap("Only admin can add notifications");
    };

    let id = nextId;
    nextId += 1;

    let notification : Notification = {
      id;
      message;
      dateLabel;
      createdAt = Time.now();
    };

    notifications.add(id, notification);
  };

  public shared ({ caller }) func editNotification(password : Text, id : Nat, message : Text, dateLabel : Text) : async () {
    if (not Text.equal(password, adminPassword)) {
      Runtime.trap("Only admin can edit notifications");
    };

    let existingNotification = switch (notifications.get(id)) {
      case (null) { Runtime.trap("Notification does not exist") };
      case (?notification) { notification };
    };

    let updatedNotification : Notification = {
      id;
      message;
      dateLabel;
      createdAt = existingNotification.createdAt;
    };

    notifications.add(id, updatedNotification);
  };

  public shared ({ caller }) func deleteNotification(password : Text, id : Nat) : async () {
    if (not Text.equal(password, adminPassword)) {
      Runtime.trap("Only admin can delete notifications");
    };

    if (not notifications.containsKey(id)) {
      Runtime.trap("Notification does not exist");
    };

    notifications.remove(id);
  };
};
