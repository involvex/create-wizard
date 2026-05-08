<!-- @format -->

# Flutter Android App Enhanced Template

This template creates an enhanced Flutter Android application with many built-in features following Flutter best practices.

## Features Included

### State Management

- **Provider**: For simple state management solutions

### Navigation

- **go_router**: Declarative routing for Flutter apps

### Dependency Injection

- **get_it**: Service locator for dependency injection

### API Handling

- **dio**: Powerful HTTP client for Dart

### JSON Serialization

- **json_annotation** & **json_serializable**: For easy JSON serialization/deserialization
- **build_runner**: Code generation utility

### Localization

- **intl**: Internationalization and localization utilities

### Theming & Assets

- **flutter_svg**: SVG support for Flutter
- Asset directories for icons, images, and fonts

### Utilities

- **shared_preferences**: Persistent storage for simple data
- **connectivity_plus**: Network connectivity detection
- **path_provider**: Locating files on the filesystem

### Testing Dependencies

- **mockito**: Mocking framework for Dart tests
- **mocktail**: Another mocking library
- **flutter_test**: Flutter's testing framework

## Project Structure

- `lib/main.dart` - Main application with enhanced features
- `android/` - Android-specific project files
- `ios/` - iOS-specific project files (for completeness)
- `test/` - Unit and widget test directory
- `pubspec.yaml` - Flutter project configuration with all dependencies
- `assets/` - Directory for storing images, icons, and fonts

## Getting Started

To create a new project using this template:

```bash
create-wizard my-flutter-app-enhanced
```

Then select the `flutter-android-app-enhanced` template from the list.

## Setup Instructions

1. Run `flutter pub get` to install all dependencies
2. Run `flutter run` to launch the app on a device or emulator
3. For JSON serialization, run `flutter pub run build_runner build` when needed

## Features Demonstrated

### State Management with Provider

The app uses Provider for state management with a simple Counter model.

### Navigation with go_router

The app demonstrates basic navigation between Home and Details pages.

### Responsive Design

The app adapts to different screen sizes and orientations.

### Material Design 3

Uses the latest Material Design components and theming.

## Customization

You can easily extend this template by:

1. Adding more screens and routes in the GoRouter configuration
2. Adding more providers for complex state management
3. Adding API services using Dio
4. Adding local storage with shared_preferences
5. Adding authentication (Firebase, etc.)
6. Adding analytics or crash reporting

## Next Steps

After generating your project:

1. Explore the `lib/main.dart` file to see how features are integrated
2. Add your own screens and navigation routes
3. Implement data models with JSON serialization
4. Add API calls using Dio
5. Implement persistence with shared_preferences
6. Add theme customization

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
