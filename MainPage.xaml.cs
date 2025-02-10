using Microsoft.Maui.Controls;

namespace esemenyrendezo
{
    public partial class MainPage : ContentPage
    {
        int count = 0;
        Grid mainGrid;
        ContentView settingsPopup;

        public MainPage()
        {
            InitializeComponent();
            CreateSettingsPopup();
        }

        // Chat gomb eseménykezelő
        private async void OnChatButtonClicked(object sender, EventArgs e)
        {
            // Navigáljunk a ChatPage-re
            await Navigation.PushAsync(new ChatPage());
        }
        // Az eseménykezelő a floppy gombhoz
        private async void OnFloppyButtonClicked(object sender, EventArgs e)
        {
            // Megnyitjuk a SavePage oldalt
            await Navigation.PushAsync(new SavePage());
        }
        // A Calendar gombhoz tartozó eseménykezelő
        private async void OnCalendarButtonClicked(object sender, EventArgs e)
        {
            // Navigálás a CalendarPage oldalra
            await Navigation.PushAsync(new CalendarPage());
        }
        private void OnHomeButtonClicked(object sender, EventArgs e)
        {
            // Oldal újratöltése
            Application.Current.MainPage = new NavigationPage(new MainPage());

            // Görgetés az oldal tetejére (ha van ScrollView)
            if (Application.Current.MainPage is MainPage mainPage && mainPage.Content is ScrollView scrollView)
            {
                scrollView.ScrollToAsync(0, 0, true);
            }
        }

        private void OnSettingsButtonClicked(object sender, EventArgs e)
        {
            // Megjeleníti vagy elrejti a beállítási popupot
            settingsPopup.IsVisible = !settingsPopup.IsVisible;
        }

        private void CreateSettingsPopup()
        {
            settingsPopup = new ContentView
            {
                IsVisible = false, // Alapértelmezetten elrejtve
                BackgroundColor = new Color(0, 0, 0, 1), // Félig átlátszó háttér
                Content = new Frame
                {
                    BackgroundColor = Colors.LightGray,
                    CornerRadius = 10,
                    Padding = 10,
                    WidthRequest = 200,
                    HeightRequest = 150,
                    VerticalOptions = LayoutOptions.End,
                    HorizontalOptions = LayoutOptions.End,
                    Margin = new Thickness(0, 0, 20, 60), // Jobb alsó sarokhoz igazítva
                    Content = new StackLayout
                    {
                        Children =
                        {
                            new Label { Text = "Beállítások", FontAttributes = FontAttributes.Bold, FontSize = 18, TextColor = Colors.Black, HorizontalOptions = LayoutOptions.Center },
                            new Button { Text = "Sötét mód", Command = new Command(ToggleDarkMode) },
                            new BoxView { HeightRequest = 10 }, // Térköz a két gomb között
                            new Button { Text = "Kilépés", Command = new Command(() => Application.Current.Quit()) }
                        }
                    }
                }
            };

            // Főoldalhoz hozzáadjuk a beállítási popupot
            mainGrid = new Grid();
            mainGrid.Children.Add(Content); // Az eredeti tartalom
            mainGrid.Children.Add(settingsPopup); // A beállítási popup

            Content = mainGrid;
        }

        private void ToggleDarkMode()
        {
            Application.Current.UserAppTheme = Application.Current.UserAppTheme == AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
        }
    }
}
