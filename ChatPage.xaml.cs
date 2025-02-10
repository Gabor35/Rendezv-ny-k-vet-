using Microsoft.Maui.Controls;
using System.Collections.ObjectModel;

namespace esemenyrendezo
{
    public partial class ChatPage : ContentPage
    {
        // A chat üzeneteket tároló lista
        public ObservableCollection<ChatMessage> Messages { get; set; }

        public ChatPage()
        {
            InitializeComponent();

            // A Messages ObservableCollection inicializálása
            Messages = new ObservableCollection<ChatMessage>();

            // A ListView adatforrása a Messages lista
            ChatList.ItemsSource = Messages;
        }

        // Üzenet küldése
        private void OnSendMessage(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(MessageEntry.Text))
            {
                // Hozzáadunk egy új üzenetet
                Messages.Add(new ChatMessage { Message = MessageEntry.Text });

                // Üzenet mező törlése
                MessageEntry.Text = string.Empty;

                // Görgetés az új üzenethez
                ChatList.ScrollTo(Messages[Messages.Count - 1], ScrollToPosition.End, true);
            }
        }

        // Vissza gomb funkciója
        private async void OnBackButtonClicked(object sender, EventArgs e)
        {
            // Visszatérés a MainPage-ra
            await Navigation.PopAsync();
        }

        // Kilépés gomb funkciója
        private void OnExitButtonClicked(object sender, EventArgs e)
        {
            // Kilépés az alkalmazásból
            Application.Current.Quit();
        }
    }

    // Chat üzenet model
    public class ChatMessage
    {
        public string Message { get; set; }
    }
}
