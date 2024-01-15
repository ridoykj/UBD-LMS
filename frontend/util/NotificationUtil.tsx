
import { Avatar } from '@hilla/react-components/Avatar.js';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Notification } from '@hilla/react-components/Notification.js';
import '@vaadin/icons';

type MessageType = 'success' | 'error' | 'info' | 'update';

type MessageDetails = {
  title: string,
  description?: string,
  url?: string,
  image?: string,
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function NotificationUtil({ type, opened, message, onOpenedChanged, onClick, }: {
  type: MessageType, opened: boolean, message: MessageDetails
  onOpenedChanged?: (e: CustomEvent<{ value: boolean }>) => void,
  onClick: () => void;
}) {

  {
    switch (type) {
      case 'success':
        return (
          <Notification
            theme="success"
            position="top-center"
            opened={opened}
            onOpenedChanged={onOpenedChanged}
          >
            <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
              <Icon icon="vaadin:check-circle" />
              <div>{message.title}</div>
              {
                message.action === undefined ? null :
                  <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }} {...message.action}>
                    {message.action?.label}
                  </Button>
              }
              <Button theme="tertiary-inline" onClick={onClick} aria-label="Close">
                <Icon icon="lumo:cross" />
              </Button>
            </HorizontalLayout>
          </Notification>
        );
      case 'error':
        return (
          <Notification
            // theme="error"
            position="top-center"
            opened={opened}
            onOpenedChanged={onOpenedChanged}
          >
            <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
              <Icon icon="vaadin:warning" style={{ color: 'var(--lumo-error-text-color)' }} />
              <div>
                <b style={{ color: 'var(--lumo-error-text-color)' }}>{message.title}</b>
                <div
                  style={{
                    fontSize: 'var(--lumo-font-size-s)',
                    color: 'var(--lumo-error-text-color)',
                  }}
                >
                  {message.description}
                </div>
              </div>
              <Button theme="tertiary-inline" onClick={onClick} aria-label="Close">
                <Icon icon="lumo:cross" />
              </Button>
            </HorizontalLayout>
          </Notification>
        );
      case 'info':
        return (
          <Notification
            position="top-center"
            opened={opened}
            onOpenedChanged={onOpenedChanged}
          >
            <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
              <Avatar name="Jason Bailey" />
              <div>
                <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
              </div>
              <Button theme="tertiary-inline" onClick={onClick} aria-label="Close">
                <Icon icon="lumo:cross" />
              </Button>
            </HorizontalLayout>
          </Notification>
        );
      case 'update':
        return (
          <Notification
            position="top-center"
            opened={opened}
            onOpenedChanged={onOpenedChanged}
          >
            <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
              <Icon icon="vaadin:check-circle" style={{ color: 'var(--lumo-success-color)' }} />
              <div>
                <b style={{ color: 'var(--lumo-success-text-color)' }}>{message.title}</b>
                <div
                  style={{
                    fontSize: 'var(--lumo-font-size-s)',
                    color: 'var(--lumo-secondary-text-color)',
                  }}
                >
                  <b>{message.description}</b> is now available
                </div>
              </div>
              <Button theme="tertiary-inline" onClick={onClick} aria-label="Close">
                <Icon icon="lumo:cross" />
              </Button>
            </HorizontalLayout>
          </Notification>
        );
      default:
        return null;
    }
  }
}