<a id="readme-top"></a>

<br />
<div align="center">
  <!-- <a href="https://github.com/tony-baglien/melodic-melee">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Melodic Melee</h3>

  <p align="center">
    A competitive ear training game where players battle by identifying different chord qualities in real-time. Test your ear and prove you're the ultimate chord master!
    <br />
    <a href="https://github.com/tony-baglien/melodic-melee"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tony-baglien/melodic-melee">View Demo</a>
    &middot;
    <a href="https://github.com/tony-baglien/melodic-melee/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/tony-baglien/melodic-melee/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

**Melodic Melee** is an interactive web-based game that combines music theory with competitive gaming. You listen to musical chords and race against your opponent to correctly identify its quality. With every correct answer, you deal damage to your opponent. Make mistakes and take damage yourself.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React.js]][React-url][![Tailwind][Tailwind]][Tailwind-url][![Zustand][Zustand]][Zustand-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- GETTING STARTED -->
## Getting Started

To get a local copy of Melodic Melee up and running, follow these simple steps.

### Prerequisites

You'll need Node.js 18 or higher and a package manager (npm, yarn, or pnpm).

* Node.js 18+
* npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/tony-baglien/melodic-melee.git
   cd melodic-melee
   ```
2. Install dependencies
   ```sh
   npm install
   ```
   Or with pnpm:
   ```sh
   pnpm install
   ```

### Development

Start the development server with hot module replacement:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```sh
npm run build
```

### Preview

Preview the production build locally:

```sh
npm run preview
```

### Testing

Run the test suite:

```sh
npm test
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Real-time audio synthesis with Web Audio API
- [x] 4 chord type recognition (Major, minor, diminished, augmented)
- [x] Two-player competitive gameplay
- [x] Health and damage system
- [ ] Local multiplayer support
- [ ] Difficulty levels (preset chord progressions, faster rounds)
- [ ] Extended chord types (7th, suspended, slash chords)
- [ ] Sound configuration (different instruments/tones, ADSR envelopes)
- [ ] Score tracking and leaderboard
- [ ] AI opponent
- [ ] Accessibility improvements (keyboard shortcuts)
- [ ] Multiplayer networking support

See the [open issues](https://github.com/tony-baglien/melodic-melee/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Antonia Gray - [@antonia-gray.bsky.social](https://bsky.app/profile/antonia-gray.bsky.social) - antonia.g.gray@gmail.com

Project Link: [https://github.com/tony-baglien/melodic-melee](https://github.com/tony-baglien/melodic-melee)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/;
[zustand]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react
[zustand-url]: https://zustand-demo.pmnd.rs/