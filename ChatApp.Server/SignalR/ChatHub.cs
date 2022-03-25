using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Server.SignalR
{
    public class ChatHub : Hub
    {
        private readonly string _chatBot;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _chatBot = "Chat Bot 🤖";
            _connections = connections ?? throw new ArgumentNullException(nameof(connections));
        }

        public async Task JoinChannel(UserConnection userConnection)
        {
            if (userConnection.Channel is not null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Channel);
                _connections[Context.ConnectionId] = userConnection;
                await Clients.Group(userConnection.Channel)
                    .SendAsync("ReceiveMessage", _chatBot, $"{userConnection.User} has joined {userConnection.Channel} channel 😁");
            }
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection))
            {
                if (userConnection.Channel is not null)
                {
                    await Clients.Group(userConnection.Channel).SendAsync("ReceiveMessage", userConnection.User, message);
                }
            }
        }

    }
}
