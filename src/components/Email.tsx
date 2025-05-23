import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from '@react-email/components'

type EmailProps = {
  sender: {
    name: string
    surname: string
    childClass: string
    email: string
  }
  message: string
}

export function Email({ sender, message }: EmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f7f7f7',
          padding: '20px',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              Nouveau message depuis le site de l'Amicale Laïque
            </Text>
            <Text>
              <strong>Nom :</strong> {sender.name} {sender.surname}
            </Text>
            <Text>
              <strong>Email :</strong> {sender.email}
            </Text>
            <Text>
              <strong>Classe de l’enfant :</strong> {sender.childClass}
            </Text>
          </Section>
          <Section style={{ marginTop: '20px' }}>
            <Text
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Message :
            </Text>
            <Text style={{ whiteSpace: 'pre-line' }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
