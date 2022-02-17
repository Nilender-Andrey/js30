class Database {
  static set(result) {
    const data = Database.get();
    let arr;
    if (data) {
      arr = data.slice(0, 9);
      arr.unshift(result);
    } else {
      arr = [result];
    }

    localStorage.setItem('result', JSON.stringify(arr));
  }

  static get() {
    return JSON.parse(localStorage.result);
  }
}

export default Database;
