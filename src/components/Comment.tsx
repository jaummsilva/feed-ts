import { useState } from "react"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"
import { FaTrash } from "react-icons/fa"
import { FaThumbsUp } from "react-icons/fa"


interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}
export function Comment({ content, onDeleteComment }: CommentProps) {

    const [likeCount, setLikeCount] = useState(0);

    // Chamar função de deletar comentario do componente pai
    function handleDeleteComment() {
        onDeleteComment(content)
    }

    // Função para dar like nos comentarios
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={'https://avatars.githubusercontent.com/u/89030731?v=4'} />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.author}>
                            <strong>João Vitor</strong>
                            <h5 className={styles.published} >Cerca de 1h atrás</h5>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <FaTrash size={20}></FaTrash>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <FaThumbsUp></FaThumbsUp>
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>

    )
}

