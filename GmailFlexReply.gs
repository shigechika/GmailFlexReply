function GmailFlexReply() {
  var threads = GmailApp.search("newer_than:1h to:bob+flex@example.jp", 0, 100);
  Logger.log("threads.length:" + threads.length);
    
  if ( ! threads.length ) {
    return; // not found
  }
    
  for (var t in threads) {
    var thread = threads[t];
    var msgs = thread.getMessages();

    for(var m in msgs) {
      var from = msgs[m].getFrom();
      Logger.log("From:" + from);
      if (true /* isMember(from) */ ) {
        var date = new Date();
        GmailApp.sendEmail(
          from, // reply-to
          "GmailFlexReply", // subject
          "只今の時間は" + Utilities.formatDate(date, "Asia/Tokyo","yyyy年M月d日（E） HH時mm分ss秒 Z" ) + "です。" // body
        );
      }
    }
  }
  GmailApp.moveThreadsToTrash(threads);
}

function isMember(email) {
  var group = GroupsApp.getGroupByEmail("ml@example.jp");
  if (group.hasUser(email)) {
    Logger.log("You are a member of this group.");
    return true;
  } else {
    Logger.log("You are not a member of this group.");
    return false;
  }
}
