let jsonData;

document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        jsonData = JSON.parse(e.target.result);

        // Populate fields with existing values
        document.getElementById("pokemon").value =
            jsonData.species_data.pokemon || "";

        document.getElementById("pokemon_rarity").value =
            jsonData.species_data.pokemon_rarity || "";

        document.getElementById("shiny_chance").value =
            jsonData.species_data.species_shiny_data.shiny_chance || "";

        document.getElementById("waves").value =
            jsonData.species_data.wave_data.waves || "";

        document.getElementById("spawns_per_wave").value =
            jsonData.species_data.wave_data.spawns_per_wave || "";

        document.getElementById("editor").style.display = "block";
    };

    reader.readAsText(file);
});

function downloadJSON() {
    // Update values only if field is not empty
    const pokemon = document.getElementById("pokemon").value.trim();
    if (pokemon) jsonData.species_data.pokemon = pokemon;

    const rarity = document.getElementById("pokemon_rarity").value.trim();
    if (rarity) jsonData.species_data.pokemon_rarity = rarity;

    const shiny = document.getElementById("shiny_chance").value.trim();
    if (shiny) jsonData.species_data.species_shiny_data.shiny_chance = Number(shiny);

    const waves = document.getElementById("waves").value.trim();
    if (waves) jsonData.species_data.wave_data.waves = Number(waves);

    const spawns = document.getElementById("spawns_per_wave").value.trim();
    if (spawns) jsonData.species_data.wave_data.spawns_per_wave = Number(spawns);

    // Create downloadable JSON
    const output = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_outbreak.json";
    a.click();

    URL.revokeObjectURL(url);
}
