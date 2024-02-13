import styles from "./Post.module.css"
import { Comment } from "./Comment"
import { Avatar } from "./Avatar"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { useState, FormEvent,ChangeEvent, InvalidEvent } from "react"

interface Content {
    type: string;
    content: string;
}

interface PostProps {
    srcAvatar: string;
    author: string;
    role: string;
    publishedAt: Date;
    content: Content[];
}


export function Post({ srcAvatar, author, role, publishedAt, content } : PostProps) {
    // UseState
    const [comments, setComments] = useState(['Post muito bacana']);
    const [newComment, setNewCommentText] = useState('');

    // Data postagem
    const publishedDateFormatted = format(publishedAt, "d 'de', LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    // Tempo da postagem
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });

    // Criar novo comentário
    function handleCreateNewComment(event:FormEvent) {
        event.preventDefault();
        setComments([...comments, newComment])
        setNewCommentText('')
    }

    // Atualizar o valor do comentario
    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        const newComment = event.target.value
        setNewCommentText(newComment)
    }
    // Validação do formulario
    function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }
    // Deletar comentario
    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        setComments(commentsWithoutDeletedOne)
    }

    // se tiver vazio o textarea, variavel pra desabilitar botao do submit
    const isNewCommentEmpty = newComment.length === 0
    return (
        <article>
            <header>
                <div className={styles.post}>
                    <div>
                        <Avatar hasBorder={true} src={srcAvatar} />
                    </div>
                    <div className={styles.profile}>
                        <strong>{author}</strong>
                        <span>{role}</span>
                    </div>
                </div>
                <div>
                    <time className={styles.published} title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                        {publishedDateRelativeToNow}
                    </time>
                </div>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'a') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    } else if (line.type === 'p') {
                        return <p key={line.content}>{line.content}</p>;
                    } else {
                        return null; // Se houver outro tipo de linha, retorne null ou adicione a lógica necessária.
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea onInvalid={handleNewCommentInvalid} required value={newComment} onChange={handleNewCommentChange} name="comment" placeholder="Deixe um comentário" />

                <button disabled={isNewCommentEmpty} type="submit">Publicar</button>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment onDeleteComment={deleteComment} key={comment} content={comment} />
                })}
            </div>
        </article >

    )
}

