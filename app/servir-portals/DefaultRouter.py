class DefaultRouter:

  default_apps = (
    'admin',
    'auth',
    'contenttypes',
    'sessions',
    'messages',
  )

  def db_for_read(self, model, **hints):
    if model._meta.app_label == self.default_apps:
      return 'default'
    return None
  
  def db_for_write(self, model, **hints):
    if model._meta.app_label == self.default_apps:
      return 'default'
    return None
  
  def allow_relation(self, obj1, obj2, **hints):
    if obj1._meta.app_label == self.default_apps and obj2._meta.app_label == self.default_apps:
      return True
    return None
  
  def allow_migrate(self, db, app_label, model_name=None, **hints):
    if app_label == self.default_apps:
      return db == 'default'
    return None