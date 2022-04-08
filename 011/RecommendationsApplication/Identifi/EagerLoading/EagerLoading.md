# Eager Loading implementation in Identifi Web

#### Sample Commit https://github.com/HighOutputVentures/identifi/commit/1f0cf461dfc553e3a2a74777147c0c9978f8f8df

### Dynamically import the component to the client site

> const HovEditorWrapper = dynamic(() => import('@components/HovEditorWrapper'), {
> ssr: false,
> })

### Create a useState to handle the visibility of the component

> const [show, setShow] = useState<boolean>(false)

### Create an onMouseEnter event to show the component when the user gives intent in using the component

> onMouseEnter={() => setShow(true)}

### Dynamically show the component using the state

> show && HovEditorWrapper disclosure={editorDisclosure} refetchPosts={refetchPosts} broadcastPost={broadcastPost} /
