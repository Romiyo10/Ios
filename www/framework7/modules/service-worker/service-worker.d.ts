import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace ServiceWorker {
  interface AppMethods {
    serviceWorker: {
      /** Service worker container (navigator.serviceWorker) */
      container: ServiceWorkerContainer
      /** Array with service workers registrations */
      registrations: ServiceWorkerRegistration[]
      /** Register service worker */
      register(path: string, scope?: string): Promise<any>
      /** Unregister service worker */
      unregister(registration?: ServiceWorkerRegistration): Promise<any>
    }
  }
  interface AppParams {
    /** Object with service worker parameters */
    serviceWorker?: {
      /** Service worker to register path (or array with paths) */
      path?: string | string[],
      /** Default service worker scope */
      scope?: string,
    }
  }
  interface AppEvents {
    /** Event will be triggered when service worker successfully registered */
    swRegisterSuccess: (registration: ServiceWorkerRegistration) => void
    /** Event will be triggered when service worker registration failed */
    swRegisterError: (error: Error) => void
    /** Event will be triggered when service worker successfully unregistered */
    swUnregisterSuccess: (success: boolean) => void
    /** Event will be triggered when service worker unregister failed */
    swUnregisterError: (error: Error) => void
  }
}
declare const ServiceWorkerModule: Framework7Plugin;

export default ServiceWorkerModule;