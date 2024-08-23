class GalamseyPortalRouter:
  def db_for_read(self, model, **hints):
    if model._meta.app_label == 'galamsey_portal':
      return 'galamsey-portal'
    return None
  
  def db_for_write(self, model, **hints):
    if model._meta.app_label == 'galamsey_portal':
      return 'galamsey-portal'
    return None
  
  def allow_relation(self, obj1, obj2, **hints):
    if obj1._meta.app_label == 'galamsey_portal' and obj2._meta.app_label == 'galamsey_portal':
      return 'galamsey-portal'
    return None
  
  def allow_migrate(self, db, app_label, model_name=None, **hints):
    if app_label == 'galamsey_portal':
      return db == 'galamsey-portal'
    return None