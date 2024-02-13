import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"
import "./global.css"
import styles from "./app.module.css"

function App() {

  const posts = [
    {
      id: 1,
      author: {
        srcAvatar: "https://avatars.githubusercontent.com/u/89030731?v=4",
        name: "João Vitor da Silva",
        role: "Developer"
      },
      content: [
        { type: 'p', content: 'Fala galeraa 👋' },
        { type: 'p', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
        { type: 'a', content: '#novoprojeto' },
        { type: 'a', content: '#nlw' },
        { type: 'a', content: '#rocketseat' },
      ],
      publishedAt: new Date('2024-02-12 10:22:00')
    },
    {
      id: 2,
      author: {
        srcAvatar: "https://avatars.githubusercontent.com/u/108689845?v=4",
        name: "Ricardo",
        role: "Developer"
      },
      content: [
        { type: 'p', content: 'Top Galera' },
        { type: 'p', content: 'Sou o brones' },
      ],
      publishedAt: new Date('2024-02-12 09:25:00')
    },
  ];


  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post key={post.id}
                srcAvatar={post.author.srcAvatar}
                author={post.author.name}
                role={post.author.role}
                publishedAt={post.publishedAt}
                content={post.content}
              />
            )
          })}
        </main>

      </div>
    </div>

  )
}

export default App
