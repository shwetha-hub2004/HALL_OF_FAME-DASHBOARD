const profiles = [
    {
      name: "Dr. Vikram Sarabhai",
      image: "assets/people/sarabhai.jpg",
      shortBio: "Father of the Indian Space Program."
    },
    {
      name: "Dr. APJ Abdul Kalam",
      image: "assets/people/kalam.jpg",
      shortBio: "Missile Man of India and 11th President."
    },
    {
      name: "Dr. R.M. Vasagam",
      image: "assets/people/vasagam.jpg",
      shortBio: "Space scientist, played a role in APPLE satellite."
    },
    {
      name: "Dr. Y. S. Rajan",
      image: "assets/people/rajan.jpg",
      shortBio: "Co-author of 'India 2020' and a visionary space planner."
    },
    {
      name: "Dr. A. Sivathanu Pillai",
      image: "assets/people/pillai.jpg",
      shortBio: "Founder-CEO of BrahMos Aerospace."
    },
    {
      name: "Gen. Sundaram",
      image: "assets/people/sundaram.jpg",
      shortBio: "Known for his strategic contributions in defense tech."
    },
    {
      name: "Dr. Mylswamy Annadurai",
      image: "assets/people/annadurai.jpg",
      shortBio: "Project director of Chandrayaan-1."
    }
  ];
  
  // Render function
  const galleryContainer = document.getElementById("main-content");
  
  profiles.forEach(profile => {
    const card = document.createElement("div");
    card.className = "profile-card fade-in";
    card.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}" />
      <h3>${profile.name}</h3>
      <p>${profile.shortBio}</p>
    `;    
    card.addEventListener("click", () => {
        document.getElementById("modalImage").src = profile.image;
        document.getElementById("modalName").textContent = profile.name;
        document.getElementById("modalBio").textContent = profile.shortBio;
        document.getElementById("profileModal").classList.remove("hidden");
      });
      
    galleryContainer.appendChild(card);
  });
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("profileModal").classList.add("hidden");
  });
  