import Container from '../components/Container';

export default function Home(){
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <Container
            title={
                <>
                 Tocou <br />
                 Locou <br />
                 Jogou!
                </>
            }>
            </Container>
        </div>
    )
}