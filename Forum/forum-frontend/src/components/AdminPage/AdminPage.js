

export function AdminPage () {
    const [users, setUsers] = useState(null);
    const params = useParams();

    useEffect(()=>{
        getComments(params.id).then(data => {
            setPost(data);
        });
    },[])

    return (
        <PostDetailsView post={post} setPost={setPost}/>      
    );
}