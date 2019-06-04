class TripPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user.present?
  end

  def show?
    user.present?
  end

  def new?
    user.present?
  end

  def create?
    user.present?
  end

  def edit?
    user_check
  end

  def update?
    user_check
  end

  def destroy?
    user_check
  end

  private

  def user_check
    record.user == user
  end
end
