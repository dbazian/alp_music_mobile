class SongModel {
  constructor(sid, id, name, genre, mood, audio, price, licenseType) {
    this.sid = sid;
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.mood = mood;
    this.audio = audio;
    this.price = price;
    this.licenseType = licenseType;
  }
}

export default SongModel;
