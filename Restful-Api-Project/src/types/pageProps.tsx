export interface HomePageProps {
    onNavigateToLogin: () => void;
};

export interface LoginPageProps {
    onLoginSuccess: (username: string) => void;
};