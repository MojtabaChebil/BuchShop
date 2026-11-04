// Beispieldaten: Buchkatalog fuer BuchShop
// Alle Titel sind gemeinfreie Klassiker, Beschreibungen sind eigene Kurztexte.

const seedBooks = [
  {
    id: 'b01',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopie',
    price: 12.99,
    description: 'In einem totalitaeren Ueberwachungsstaat kaempft Winston Smith um seine Menschlichkeit und Wahrheit gegen die allmaechtige Partei.',
    stock: 30,
    rating: 4.8,
    year: 1949
  },
  {
    id: 'b02',
    title: 'Stolz und Vorurteil',
    author: 'Jane Austen',
    category: 'Klassiker',
    price: 9.99,
    description: 'Elizabeth Bennet und der stolze Mr. Darcy muessen ihre Vorurteile ueberwinden, um im England des 19. Jahrhunderts zueinanderzufinden.',
    stock: 22,
    rating: 4.7,
    year: 1813
  },
  {
    id: 'b03',
    title: 'Moby Dick',
    author: 'Herman Melville',
    category: 'Abenteuer',
    price: 14.50,
    description: 'Kapitaen Ahab jagt besessen den weissen Wal, der ihm einst ein Bein raubte - eine Reise bis an die Grenzen des Wahnsinns.',
    stock: 15,
    rating: 4.3,
    year: 1851
  },
  {
    id: 'b04',
    title: 'Der grosse Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Klassiker',
    price: 10.99,
    description: 'Im rauschenden New York der 1920er Jahre verfolgt der geheimnisvolle Jay Gatsby einen Traum, der ihm fuer immer entgleitet.',
    stock: 28,
    rating: 4.5,
    year: 1925
  },
  {
    id: 'b05',
    title: 'Eine Studie in Scharlachrot',
    author: 'Arthur Conan Doyle',
    category: 'Krimi',
    price: 8.99,
    description: 'Der Beginn einer legendaeren Partnerschaft: Sherlock Holmes und Dr. Watson loesen ihren ersten gemeinsamen Mordfall in London.',
    stock: 20,
    rating: 4.6,
    year: 1887
  },
  {
    id: 'b06',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    category: 'Horror',
    price: 11.50,
    description: 'Ein junger Wissenschaftler erschafft Leben aus toter Materie - und muss mit den Konsequenzen seines Ehrgeizes leben.',
    stock: 18,
    rating: 4.4,
    year: 1818
  },
  {
    id: 'b07',
    title: 'Die Verwandlung',
    author: 'Franz Kafka',
    category: 'Klassiker',
    price: 7.99,
    description: 'Eines Morgens erwacht Gregor Samsa als riesiges Insekt und muss sich einer Familie stellen, die ihn nicht mehr erkennt.',
    stock: 25,
    rating: 4.5,
    year: 1915
  },
  {
    id: 'b08',
    title: 'Dracula',
    author: 'Bram Stoker',
    category: 'Horror',
    price: 12.00,
    description: 'Ein uralter Graf aus Transsilvanien bringt Schrecken nach England - ein Meisterwerk der Gothic-Horror-Literatur.',
    stock: 17,
    rating: 4.5,
    year: 1897
  },
  {
    id: 'b09',
    title: 'Alice im Wunderland',
    author: 'Lewis Carroll',
    category: 'Kinderbuch',
    price: 9.50,
    description: 'Alice faellt durch ein Kaninchenloch in eine Welt voller sprechender Tiere, verrueckter Teepartys und unmoeglicher Logik.',
    stock: 35,
    rating: 4.6,
    year: 1865
  },
  {
    id: 'b10',
    title: 'Krieg und Frieden',
    author: 'Leo Tolstoi',
    category: 'Klassiker',
    price: 19.99,
    description: 'Ein episches Panorama des napoleonischen Russlands, erzaehlt durch das Schicksal mehrerer Adelsfamilien.',
    stock: 10,
    rating: 4.7,
    year: 1869
  },
  {
    id: 'b11',
    title: 'Die Abenteuer des Tom Sawyer',
    author: 'Mark Twain',
    category: 'Abenteuer',
    price: 8.50,
    description: 'Ein frecher Junge erlebt am Mississippi Abenteuer, die von Schatzsuche bis zu einem Mordfall reichen.',
    stock: 24,
    rating: 4.4,
    year: 1876
  },
  {
    id: 'b12',
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    category: 'Abenteuer',
    price: 9.90,
    description: 'Nach einem Schiffbruch muss ein Mann ganz allein auf einer einsamen Insel ums Ueberleben kaempfen.',
    stock: 19,
    rating: 4.2,
    year: 1719
  },
  {
    id: 'b13',
    title: 'Der Prozess',
    author: 'Franz Kafka',
    category: 'Klassiker',
    price: 10.50,
    description: 'Josef K. wird eines Morgens verhaftet, ohne je zu erfahren, welches Verbrechen man ihm vorwirft - ein albtraumhaftes Meisterwerk.',
    stock: 16,
    rating: 4.3,
    year: 1925
  },
  {
    id: 'b14',
    title: 'Faust',
    author: 'Johann Wolfgang von Goethe',
    category: 'Drama',
    price: 13.90,
    description: 'Ein Gelehrter schliesst einen Pakt mit dem Teufel, um die letzten Geheimnisse des Lebens zu ergruenden.',
    stock: 14,
    rating: 4.6,
    year: 1808
  },
  {
    id: 'b15',
    title: 'Die Leiden des jungen Werther',
    author: 'Johann Wolfgang von Goethe',
    category: 'Klassiker',
    price: 8.90,
    description: 'Ein junger Mann verzehrt sich in unerfuellter Liebe - ein Roman, der eine ganze Generation bewegte.',
    stock: 21,
    rating: 4.2,
    year: 1774
  },
  {
    id: 'b16',
    title: 'Grimms Maerchen',
    author: 'Brueder Grimm',
    category: 'Kinderbuch',
    price: 11.00,
    description: 'Die beruehmtesten Volksmaerchen der Brueder Grimm, gesammelt in einem zeitlosen Band fuer Gross und Klein.',
    stock: 40,
    rating: 4.8,
    year: 1812
  },
  {
    id: 'b17',
    title: 'Also sprach Zarathustra',
    author: 'Friedrich Nietzsche',
    category: 'Philosophie',
    price: 15.90,
    description: 'Nietzsches philosophisches Meisterwerk ueber den Uebermenschen, den ewigen Kreislauf und den Tod Gottes.',
    stock: 12,
    rating: 4.1,
    year: 1883
  },
  {
    id: 'b18',
    title: 'Hamlet',
    author: 'William Shakespeare',
    category: 'Drama',
    price: 9.50,
    description: 'Der Prinz von Daenemark sinnt auf Rache fuer den Mord an seinem Vater - Shakespeares beruehmteste Tragoedie.',
    stock: 23,
    rating: 4.7,
    year: 1600
  }
];

module.exports = { seedBooks };
