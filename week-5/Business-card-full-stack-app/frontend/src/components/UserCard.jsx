import Card from 'react-bootstrap/Card';

export function UserCard(props){
    return(
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.description}</Card.Subtitle>
                <Card.Title>Interests</Card.Title>
                {props.interests.map(function(interest){
                    return <Card.Subtitle className="mb-2 text-muted">{interest}</Card.Subtitle>
                })}
                <Card.Link href={props.linkedin}>LinkedIn</Card.Link>
                <Card.Link href={props.twitter}>Twitter</Card.Link>
            </Card.Body>
            </Card>
        </div>
    );
}